# embedding_server.py
from flask import Flask, request, jsonify
from transformers import AutoModel, AutoTokenizer
import numpy as np

app = Flask(__name__)

# BERT 모델과 토크나이저 로드
model_name = "sentence-transformers/all-MiniLM-L6-v2"  # 경량화된 임베딩 모델
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def get_embedding(text):
    # 텍스트를 벡터화하는 함수
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state[:, 0, :].detach().numpy()
    normalized_vector = (embeddings[0] - np.min(embeddings[0])) / (np.max(embeddings[0]) - np.min(embeddings[0])) * 2 - 1  # -1 ~ 1로 변환

    return normalized_vector.tolist()


# embedding_server.py
@app.route("/embed", methods=["POST"])
def embed():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    embedding = get_embedding(text)
    return jsonify(embedding)  # 전체 JSON 객체가 아닌 embedding 배열만 반환

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
