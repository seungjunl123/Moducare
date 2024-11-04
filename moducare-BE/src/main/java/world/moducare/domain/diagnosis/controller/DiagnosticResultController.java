package world.moducare.domain.diagnosis.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.diagnosis.dto.DiagnosisResponseDto;
import world.moducare.domain.diagnosis.dto.DiagnosticResultDto;
import world.moducare.domain.diagnosis.service.DiagnosticResultService;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.oauth.CustomOAuth2User;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/diagnosis")
@Tag(name = "Diagnosis API", description = "AI 진단 관련 API")
public class DiagnosticResultController {

    private final MemberService memberService;
    private final DiagnosticResultService diagnosticResultService;

    @GetMapping
    @Operation(summary = "진단 목록 조회", description = "사용자의 진단 목록을 조회")
    public ResponseEntity<List<DiagnosisResponseDto>> getDiagnosticList(@AuthenticationPrincipal CustomOAuth2User principal) {
        // 진단 목록 조회 로직 작성
        Member member = memberService.findById(principal.getId());
        List<DiagnosisResponseDto> diagnosisResponseDtoList = diagnosticResultService.getDiagnosticList(member);
        return ResponseEntity.status(HttpStatus.OK).body(diagnosisResponseDtoList);
    }

    @GetMapping("/{diagnosisId}")
    @Operation(summary = "진단 내역 상세 조회", description = "사용자의 진단 목록 중 하나를 상세 조회")
    public ResponseEntity<DiagnosticResultDto> getDiagnosticResult(@PathVariable Long diagnosisId, @AuthenticationPrincipal CustomOAuth2User principal) {
        // 특정 진단 결과 상세 조회 로직 작성
        Member member = memberService.findById(principal.getId());
        DiagnosticResultDto result = diagnosticResultService.getDiagnosis(diagnosisId,member);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
