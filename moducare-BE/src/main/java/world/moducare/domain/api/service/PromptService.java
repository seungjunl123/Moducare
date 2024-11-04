package world.moducare.domain.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import world.moducare.domain.api.dto.WeatherResponseDto;

@Service
@RequiredArgsConstructor
public class PromptService {
    private final String[] dustFormat = {"좋음", "보통", "나쁨", "매우나쁨"};
    public String makeEnvironmentPrompt(WeatherResponseDto weatherResponseDto) {
        String dust = dustFormat[weatherResponseDto.getAirCondition()];
        int temperature = weatherResponseDto.getTemperature();
        String uv = switch (weatherResponseDto.getUvCondition()) {
            case 0, 1, 2 -> "낮음";
            case 3, 4, 5 -> "보통";
            case 6, 7 -> "높음";
            case 8, 9, 10 -> "매우 높음";
            default -> "위험";
        };

        return String.format("현재 대기질 지수는 %s, 기온은 %d도, 자외선 지수는 %s입니다. 이에 따라 적절한 탈모, 두피 관리 및 예방 조언을 제공해 주세요. 답변은 반드시 다음 형식을 따르세요: \\n" +
                "오늘은 {날씨에 대한 설명}! \\n"+
                "{오늘 날씨에 따른 두피 관리 및 예방 조언}을 하는건 어떨까요? \\n"+
                "각 문장 당 30자 이내로 두 문장의 형식으로 답변을 해주어야합니다. 반드시 두 문장을 넘어가서는 안됩니다.", dust, temperature, uv);

    }
}
