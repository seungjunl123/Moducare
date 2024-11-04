package world.moducare.domain.diagnosis.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class DiagnosticResultDto {
    private String image;
    private String manageComment;
    private int[] result;
    private int comparison;
    private String date;
}
