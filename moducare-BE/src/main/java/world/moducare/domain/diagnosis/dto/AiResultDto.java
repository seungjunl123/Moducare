package world.moducare.domain.diagnosis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AiResultDto {
    private int[] result;
    private int headType;

    public double calculateAverage() {
        int sum = 0;
        for (int value : result) {
            sum += value;
        }
        return sum / 6.0;
    }

    // 탈모,비듬, 염증, 홍반, 피지, 각질
    public String resultToString(int index) {
        switch (result[index]) {
            case 0:
                return "양호";
            case 1:
                return "주의";
            case 2:
                return "경고";
            case 3:
                return "심각";
            default:
                return "알 수 없음"; // 혹시 모를 예외 상황을 위한 기본값
        }
    }


    public String headTypeToString() {
        switch (headType) {
            case 0:
                return "양호";
            case 1:
                return "건성";
            case 2:
                return "지성";
            case 3:
                return "민감성";
            case 4:
                return "지루성";
            case 5:
                return "염증성";
            case 6:
                return "비듬성";
            case 7:
                return "탈모성";
            default:
                return "알 수 없음"; // 혹시 모를 예외 상황을 위한 기본값
        }
    }
}
