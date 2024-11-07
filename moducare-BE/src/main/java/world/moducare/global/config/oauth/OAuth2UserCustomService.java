package world.moducare.global.config.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.repository.MemberRepository;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.exception.ErrorCode;
import world.moducare.global.exception.RestApiException;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserCustomService {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public CustomOAuth2User loadUser(String accessToken, String registerId) {
        switch (registerId) {
            case "naver":
                return loadNaverUser(accessToken);
            case "kakao":
                return loadKakaoUser(accessToken);
            case "google":
                return loadGoogleUser(accessToken);
            default:
                throw new RestApiException(ErrorCode.NOT_FOUND);
        }
    }

    private CustomOAuth2User loadGoogleUser(String accessToken) {
        // 네이버와 같은 방식으로 구글 API 호출하여 사용자 정보 가져오기
        return retrieveUser("https://www.googleapis.com/oauth2/v3/userinfo", accessToken);
    }

    private CustomOAuth2User loadNaverUser(String accessToken) {
        return retrieveUser("https://openapi.naver.com/v1/nid/me", accessToken);
    }

    private CustomOAuth2User loadKakaoUser(String accessToken) {
        return retrieveUser("https://kapi.kakao.com/v2/user/me", accessToken);
    }

    private CustomOAuth2User retrieveUser(String userInfoEndpoint, String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, entity, Map.class);
        Map<String, Object> userAttributes = parseAttributes(response);

        String email = (String) userAttributes.get("email");
        String name = (String) userAttributes.getOrDefault("name", "User");
        String finalName;
        if (name.equals("")||name==null) {
            finalName = "자라나라머리머리";
        } else {
            finalName = name;
        }
        Member member = memberService.saveOrUpdateMember(email, finalName);
        return new CustomOAuth2User(member);
    }

    private Map<String, Object> parseAttributes(ResponseEntity<Map> response) {
        Map<String, Object> responseBody = response.getBody();
        if (responseBody == null || !responseBody.containsKey("response")) {
            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
        }
        return (Map<String, Object>) responseBody.get("response");
    }
}
