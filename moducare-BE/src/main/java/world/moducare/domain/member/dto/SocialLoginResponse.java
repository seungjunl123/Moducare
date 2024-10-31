package world.moducare.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SocialLoginResponse {
    private String name;
    private String birth;
    private String email;
}
