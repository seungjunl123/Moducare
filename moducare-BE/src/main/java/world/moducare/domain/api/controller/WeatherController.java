package world.moducare.domain.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.api.dto.WeatherRequestDto;
import world.moducare.domain.api.dto.WeatherResponseDto;
import world.moducare.domain.api.dto.WeatherResultResponseDto;
import world.moducare.domain.api.externalApi.gpt.GptService;
import world.moducare.domain.api.service.EnvironmentalDataService;
import world.moducare.domain.api.service.PromptService;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
@Tag(name = "Environment API", description = "환경 데이터 관련 API")
public class WeatherController {

    private final EnvironmentalDataService environmentalDataService;
    private final GptService gptService;
    private final PromptService promptService;

    @Operation(summary = "현재 기준 3일동안의 밤 9시 날씨 예보 정보 조회")
    @GetMapping(value = "", produces = "application/json")
    public ResponseEntity<WeatherResultResponseDto> getWeatherData(@RequestBody WeatherRequestDto weatherRequestDto) throws Exception {
        WeatherResponseDto weatherResponseDto = environmentalDataService.getEnvironmentalData(weatherRequestDto);
        System.out.println("result: " + weatherResponseDto.getAirCondition()+" : "+weatherResponseDto.getTemperature()+" : "+weatherResponseDto.getUvCondition());
        String gptAnswer = gptService.chat(promptService.makeEnvironmentPrompt(weatherResponseDto));
        WeatherResultResponseDto result = WeatherResultResponseDto.builder().weatherDto(weatherResponseDto).gptResponse(gptAnswer).build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
