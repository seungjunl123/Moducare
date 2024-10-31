package world.moducare.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TokenRequest {
    private String fcmToken;
    private String refreshToken;
}
