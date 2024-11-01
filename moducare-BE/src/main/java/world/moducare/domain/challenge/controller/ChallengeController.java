package world.moducare.domain.challenge.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.challenge.dto.ChallengeRequestDto;
import world.moducare.domain.challenge.dto.ChallengeResponseDto;
import world.moducare.domain.challenge.service.ChallengeService;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.oauth.CustomOAuth2User;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "챌린지 컨트롤러", description = "챌린지 관련 API")
@RequestMapping("/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;
    private final MemberService memberService;

    @PostMapping()
    @Operation(summary="챌린지 생성 API")
    public ResponseEntity<Void> makeChallenge(@AuthenticationPrincipal CustomOAuth2User principal, @RequestBody ChallengeRequestDto requestDto) {
        Member member = memberService.findById(principal.getId());
        challengeService.saveChallenge(member, requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//    @GetMapping()
//    @Operation(summary = "전체 챌린지 목록 조회 API")
//    public ResponseEntity<List<ChallengeResponseDto>> getChallengeList(@AuthenticationPrincipal CustomOAuth2User principal){
//        Member member = memberService.findById(principal.getId());
//        List<ChallengeResponseDto> list = challengeService.getList(member);
//        return ResponseEntity.ok(list);
//    }
}
