package world.moducare.domain.diary.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.diary.dto.DiaryRequestDto;
import world.moducare.domain.diary.dto.DiaryResponseDto;
import world.moducare.domain.diary.service.DiaryService;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.oauth.CustomOAuth2User;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/diaries")
@Tag(name = "Diary API", description = "머리 다이어리 관련 API")
public class DiaryController {

    private final MemberService memberService;
    private final DiaryService diaryService;

    @PostMapping("")
    @Operation(summary = "머리 다이어리 저장", description = "이마 라인이나 정수리 사진을 저장")
    public ResponseEntity<?> saveLatestProduct(@AuthenticationPrincipal CustomOAuth2User principal, @RequestBody DiaryRequestDto diaryRequestDto) {
        Member member = memberService.findById(principal.getId());
        diaryService.saveDiary(member, diaryRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("머리 다이어리 저장 완료");
    }

    @GetMapping("/top")
    @Operation(summary = "최근 본 상품 저장", description = "사용자가 가장 최근에 본 추천 제품을 저장")
    public ResponseEntity<List<DiaryResponseDto>> getTopDiary(@AuthenticationPrincipal CustomOAuth2User principal) {
        Member member = memberService.findById(principal.getId());
        List<DiaryResponseDto> diaryResponseDtoList = diaryService.findDiary(member, "top");
        return ResponseEntity.status(HttpStatus.OK).body(diaryResponseDtoList);
    }

    @GetMapping("/line")
    @Operation(summary = "최근 본 상품 저장", description = "사용자가 가장 최근에 본 추천 제품을 저장")
    public ResponseEntity<List<DiaryResponseDto>> getLineDiary(@AuthenticationPrincipal CustomOAuth2User principal) {
        Member member = memberService.findById(principal.getId());
        List<DiaryResponseDto> diaryResponseDtoList = diaryService.findDiary(member, "line");
        return ResponseEntity.status(HttpStatus.OK).body(diaryResponseDtoList);
    }
}
