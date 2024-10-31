package world.moducare.domain.stress.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StressResultResponseDto {

    private String date;  // 날짜
    private String score; // 점수

}
