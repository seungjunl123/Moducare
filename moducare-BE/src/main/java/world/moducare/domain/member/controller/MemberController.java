package world.moducare.domain.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import world.moducare.domain.member.dto.SocialLoginResponse;
import world.moducare.domain.member.dto.TokenRequest;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.oauth.CustomOAuth2User;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
@Tag(name = "Member API", description = "시민 사용자 관련 API")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/fcm")
    @Operation(summary = "토큰 전송", description = "시민 사용자의 fcm 토큰과 refresh 토큰 전송")
    public ResponseEntity<SocialLoginResponse> saveTokens(@AuthenticationPrincipal CustomOAuth2User principal, @RequestBody TokenRequest tokenRequest) {
        if (principal == null) {
            System.out.println("nothing!!");
        }
        SocialLoginResponse socialLoginResponse = memberService.saveFcmAndRefresh(principal.getId(), tokenRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(socialLoginResponse);
    }
}
