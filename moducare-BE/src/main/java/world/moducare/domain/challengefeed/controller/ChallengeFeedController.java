package world.moducare.domain.challengefeed.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.challengefeed.dto.FeedRequestDto;
import world.moducare.domain.challengefeed.service.ChallengeFeedService;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.oauth.CustomOAuth2User;

@RestController
@RequiredArgsConstructor
@Tag(name = "챌린지 인증 컨트롤러", description = "챌린지 인증 관련 API")
@RequestMapping("/challenge-feeds")
public class ChallengeFeedController {

    private final MemberService memberService;
    private final ChallengeFeedService feedService;

    @PostMapping("/{challengeId}")
    @Operation(summary = "챌린지 인증하기(하루 단위)")
    public ResponseEntity<Void> postFeed(@AuthenticationPrincipal CustomOAuth2User principal, @PathVariable Long challengeId,  @RequestBody FeedRequestDto requestDto) {
        Member member = memberService.findById(principal.getId());
        feedService.saveFeed(member, challengeId,  requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
