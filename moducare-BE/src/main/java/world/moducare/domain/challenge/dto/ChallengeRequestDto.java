package world.moducare.domain.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class ChallengeRequestDto {

    private String title;

    private MultipartFile file;

}
