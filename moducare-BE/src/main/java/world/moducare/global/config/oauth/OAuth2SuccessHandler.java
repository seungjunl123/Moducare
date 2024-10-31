package world.moducare.global.config.oauth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.repository.MemberRepository;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.jwt.TokenProvider;
import world.moducare.global.exception.ErrorCode;
import world.moducare.global.exception.RestApiException;

import java.io.IOException;
import java.time.Duration;

@RequiredArgsConstructor
@Component
// 별도의 authenticationSuccessHandler를 지정하지 않으면 로그인 성공 이후 SimpleUrlAuthenticationSuccessHandler 사용
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofHours(2);
//    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofSeconds(50);
//    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofSeconds(15);

    @Value("${redirect_uri}")
    private String REDIRECT_PATH;

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        // 이메일을 사용해 Member 엔티티를 가져옴
        Member member = memberService.findByEmail(email);
//        // 클라이언트로부터 FCM 토큰을 받아서 처리
//        String fcmToken = request.getHeader("Fcm-Token");

        // 리프레시 토큰 생성 -> 저장
        // 토큰 제공자를 사용해 리프레시 토큰 생성
        // 데이터베이스에 유저 아이디와 함께 저장
        String refreshToken = tokenProvider.generateMemberToken(member, REFRESH_TOKEN_DURATION);
//        addRefreshTokenToCookie(request, response, refreshToken);
////         FCM 토큰과 리프레시 토큰을 저장
        saveRefreshToken(member.getId(), refreshToken);

        // 액세스 토큰 생성 -> 경로에 액세스 토큰 추가
        // 토큰 제공자를 사용해 액세스 토큰을 만든 뒤 리다이렉트 경로가 담긴 값을 가져와 쿼리 파라미터에 액세스 토큰 추가
        String accessToken = tokenProvider.generateMemberToken(member, ACCESS_TOKEN_DURATION);
        String targetUrl = getTargetUrl(accessToken, refreshToken);

        System.out.println("HERE!!!!!!!!!!!!!! "+email+" "+member.getId());
        // 인증 관련 설정값
        // 인증 프로세스를 진행하면서 인증 관련 데이터 제거
        clearAuthenticationAttributes(request);

        // 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    // 생성된 리프레시 토큰을 전달받아 데이터베이스에 저장
    private void saveRefreshToken(Long userId, String newRefreshToken) {
        Member member = memberRepository.findById(userId)
                .map(entity -> entity.updateRefresh(newRefreshToken))
                        .orElseThrow(()-> new RestApiException(ErrorCode.NOT_FOUND));

        memberRepository.save(member);
    }

    // 액세스 토큰과 리프레시 토큰을 패스에 추가(액세스 토큰과 리프레시 토큰을 쿼리 파라미터로 반환)
    private String getTargetUrl(String accessToken, String refreshToken) {
        //TODO: path 확인하기
        return UriComponentsBuilder.fromUriString(REDIRECT_PATH+"/social")
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build()
                .toUriString();
    }
}
