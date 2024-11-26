package world.moducare.global.config.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties("jwt") // 자바 클래스에 프로퍼티값을 가져와서 사용하는 애너테이션
public class JwtProperties {
    // 이슈발급자, 비밀키를 필수로 설정한 값들을 변수로 접근하는데 사용할 클래스
    private String issuer;
    private String secretKey;
}
