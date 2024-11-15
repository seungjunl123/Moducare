import io
from concurrent.futures import ThreadPoolExecutor

import requests
import torch
from PIL import Image
from flask import Flask, request, jsonify
from torchvision import transforms

app = Flask(__name__)

PATH = './scalp_weights/'

print(torch.cuda.is_available(), "cuda" if torch.cuda.is_available() else "cpu")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 모델 가중치만 불러오기
models = {
    "model1": torch.load(PATH + 'aram_model1.pt', map_location=device),  # 미세각질
    "model2": torch.load(PATH + 'aram_model2.pt', map_location=device),  # 피지과다
    "model3": torch.load(PATH + 'aram_model3.pt', map_location=device),  # 모낭사이홍반
    "model4": torch.load(PATH + 'aram_model4.pt', map_location=device),  # 모낭홍반농포
    "model5": torch.load(PATH + 'aram_model5.pt', map_location=device),  # 비듬
    "model6": torch.load(PATH + 'aram_model6.pt', map_location=device),  # 탈모
}

model7 = torch.load(PATH + 'aram_model7.pt', map_location=device)  # 두피여부


# 이미지 전처리 함수
def preprocess_image(img_url):
    try:
        response = requests.get(img_url)
        response.raise_for_status()  # 요청이 성공했는지 확인
        img = Image.open(io.BytesIO(response.content))
    except requests.exceptions.RequestException as e:
        raise ValueError(f"이미지 다운로드에 실패했습니다: {str(e)}")

    # 전처리: 이미지 크기 조정 및 텐서로 변환
    transform = transforms.Compose([
        transforms.Resize([600, 600], interpolation=transforms.InterpolationMode.BOX),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    img = transform(img).unsqueeze(0)  # 배치 차원 추가
    return img


# 모델 예측 함수
def predict_model(model, img):
    with torch.no_grad():
        return model(img)


# 두피 여부 예측
def predict_scalp(img):
    output7 = predict_model(model7, img)
    return output7.argmax(dim=1, keepdim=True).item()


# 두피 유형 진단
def diagnose_head_type(m1p, m2p, m3p, m4p, m5p, m6p):
    if m1p == 0 and m2p == 0 and m3p == 0 and m4p == 0 and m5p == 0:
        return 0  # 정상
    if m1p != 0 and m2p == 0 and m3p == 0 and m4p == 0 and m5p == 0:
        return 1  # 건성 두피
    if m1p == 0 and m2p != 0 and m3p == 0 and m4p == 0 and m5p == 0:
        return 2  # 지성 두피
    if m2p == 0 and m3p != 0 and m4p == 0 and m5p == 0:
        return 3  # 민감성 두피
    if m2p != 0 and m3p != 0 and m4p == 0:
        return 4  # 지루성 두피
    if m3p == 0 and m4p != 0:
        return 5  # 염증성 두피
    if m3p == 0 and m4p == 0 and m5p != 0:
        return 6  # 비듬성 두피
    if m6p != 0:
        return 7  # 탈모
    return 8  # 복합성 두피


@app.route('/ai', methods=['POST'])
def menu_res():
    # JSON 요청에서 S3 URL을 받음
    data = request.get_json()
    if 'img' not in data:
        return jsonify({"error": "이미지 URL이 제공되지 않았습니다."}), 400

    img_url = data['img']

    try:
        img = preprocess_image(img_url)
    except ValueError as e:
        return jsonify({"error": str(e)}), 500

    # 이미지가 두피 이미지인지 확인 (모델7 사용)
    if predict_scalp(img) != 0:
        return jsonify({"error": "두피 이미지가 아닙니다."}), 400

    # 병렬로 여러 모델 예측 진행
    with ThreadPoolExecutor() as executor:
        futures = {
            model_name: executor.submit(predict_model, model, img) for model_name, model in models.items()
        }
        outputs = {model_name: future.result() for model_name, future in futures.items()}

    # 각 모델의 예측 결과 추출
    predictions = {model_name: output.argmax(dim=1, keepdim=True).item() for model_name, output in outputs.items()}

    # 두피 유형 진단
    head_type = diagnose_head_type(
        predictions.get("model1"),
        predictions.get("model2"),
        predictions.get("model3"),
        predictions.get("model4"),
        predictions.get("model5"),
        predictions.get("model6")
    )

    # 결과를 JSON 형태로 구성
    result = list(predictions.values())[::-1]  # [탈모, 비듬, 모낭홍반농포, 모낭사이홍반, 피지과다, 미세각질]

    response = {
        "result": result,
        "headType": head_type
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5050)
