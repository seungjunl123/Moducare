package world.moducare.domain.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.member.dto.LogoutRequest;
import world.moducare.domain.member.dto.ModifyRequest;
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

    // 로그아웃 API
    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "로그아웃입니다.")
    public ResponseEntity<String> logout(@AuthenticationPrincipal CustomOAuth2User principal) {

        Long id = principal.getId(); // 현재 인증된 사용자의 이메일 가져오기
        Member member = memberService.findById(id);
        memberService.logout(member);

        // 로그아웃 로직 (SecurityContext 초기화 등)
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successful");
    }

    // 회원 탈퇴
    @DeleteMapping("/")
    @Operation(summary = "회원탈퇴", description = "회원탈퇴입니다.")
    public ResponseEntity<String> deleteAccount(@AuthenticationPrincipal CustomOAuth2User principal) {
        Long id = principal.getId(); // 현재 인증된 사용자의 ID 가져오기
        Member member = memberService.findById(id);

        // 회원 탈퇴 로직 수행 (회원 삭제 등)
        memberService.deleteMember(member);

        // SecurityContext 초기화 등 로그아웃 처리
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Account deletion successful");
    }

    @PutMapping("/modify")
    @Operation(summary = "회원정보 수정", description = "회원 정보(이름, 생일)을 수정합니다.")
    public ResponseEntity<String> modifyAccount(@AuthenticationPrincipal CustomOAuth2User principal, ModifyRequest modifyRequest) {
        Long id = principal.getId(); // 현재 인증된 사용자의 ID 가져오기
        Member member = memberService.findById(id);

        // 회원 탈퇴 로직 수행 (회원 삭제 등)
        memberService.modifyMember(member, modifyRequest);
        return ResponseEntity.ok("Account modification successful");
    }

}
