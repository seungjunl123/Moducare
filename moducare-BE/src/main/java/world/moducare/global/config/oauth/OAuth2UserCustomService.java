package world.moducare.global.config.oauth;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
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

    private static final Logger logger = LoggerFactory.getLogger(OAuth2UserCustomService.class);
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public CustomOAuth2User loadUser(String accessToken, String registerId) {
        logger.info("Starting OAuth2 login with provider: {}", registerId);
        switch (registerId) {
            case "naver":
                return loadNaverUser(accessToken);
            case "kakao":
                return loadKakaoUser(accessToken);
            case "google":
                return loadGoogleUser(accessToken);
            default:
                logger.error("OAuth2 provider {} not found", registerId);
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
        logger.info("Fetching user information from endpoint: {}", userInfoEndpoint);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, entity, Map.class);
        Map<String, Object> userAttributes = parseAttributes(response);
        logger.info("User attributes retrieved: {}", userAttributes);

        if (userAttributes.containsKey("error")) {
            logger.warn("No user information found in response.");
            throw new RestApiException(ErrorCode.CONFLICT);
        }

        String email = (String) userAttributes.get("email");
        String name = (String) userAttributes.getOrDefault("name", "자라나라머리머리");
        String finalName;
        if (name.equals("")||name==null) {
            finalName = "자라나라머리머리";
        } else {
            finalName = name;
        }

        logger.info("Retrieved email: {}, name: {}", email, finalName);
        Member member = memberService.saveOrUpdateMember(email, finalName);
        return new CustomOAuth2User(member);
    }

    private Map<String, Object> parseAttributes(ResponseEntity<Map> response) {
        logger.info("Parsing attributes from response");
        Map<String, Object> responseBody = response.getBody();
        if (responseBody == null || !responseBody.containsKey("response")) {
            logger.error("Failed to retrieve response body or 'response' key missing");
            throw new RestApiException(ErrorCode.UNAUTHORIZED_REQUEST);
        }
        return (Map<String, Object>) responseBody.get("response");
    }
}
