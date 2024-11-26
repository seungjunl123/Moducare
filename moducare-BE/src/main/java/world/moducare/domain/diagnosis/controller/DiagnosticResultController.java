package world.moducare.domain.diagnosis.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import world.moducare.domain.diagnosis.dto.AiResultDto;
import world.moducare.domain.diagnosis.dto.DiagnosisRequestDto;
import world.moducare.domain.diagnosis.dto.DiagnosisResponseDto;
import world.moducare.domain.diagnosis.service.DiagnosticResultService;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.oauth.CustomOAuth2User;
import world.moducare.global.s3.S3Service;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diagnosis")
@Tag(name = "AI 진단 컨트롤러", description = "AI 진단 관련 API")
public class DiagnosticResultController {

    private static final Logger log = LoggerFactory.getLogger(DiagnosticResultController.class);
    private final MemberService memberService;
    private final DiagnosticResultService diagnosticResultService;
    private final S3Service s3Service;

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
    public ResponseEntity<DiagnosisRequestDto> getDiagnosticResult(@PathVariable Long diagnosisId, @AuthenticationPrincipal CustomOAuth2User principal) {
        // 특정 진단 결과 상세 조회 로직 작성
        Member member = memberService.findById(principal.getId());
        DiagnosisRequestDto diagnosisRequestDto = diagnosticResultService.getDiagnosis(diagnosisId, member);
        return ResponseEntity.status(HttpStatus.OK).body(diagnosisRequestDto);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "두피진단", description = "두피 진단 결과")
    public ResponseEntity<?> saveDiagnosticResult(
            @Parameter(description = "두피 사진파일", required = true) @RequestParam("file") MultipartFile file
            , @AuthenticationPrincipal CustomOAuth2User user) {

        long startTime = System.currentTimeMillis();
        log.info("Start time: {}", startTime);
        String url = s3Service.uploadImage(file);
        long endTime = System.currentTimeMillis();
        log.info("End time: {}", endTime);
        log.info("Execution S3 time: {} ms", (endTime - startTime));
        if (url != null) {
            AiResultDto aiResultDto;
            try {
                startTime = System.currentTimeMillis();
                aiResultDto = diagnosticResultService.getResultByAI(url);
                endTime = System.currentTimeMillis();
                log.info("End time: {}", endTime);
                log.info("Execution AI time: {} ms", (endTime - startTime));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("두피 이미지가 아닙니다.");
            }
            startTime = System.currentTimeMillis();
            DiagnosisRequestDto diagnosisRequestDto = diagnosticResultService.diagnoseByAI(user.getMember(), aiResultDto, url);
            endTime = System.currentTimeMillis();
            log.info("End time: {}", endTime);
            log.info("Execution result time: {} ms", (endTime - startTime));
            return ResponseEntity.status(HttpStatus.CREATED).body(diagnosisRequestDto);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미지 업로드에 문제가 발생했습니다.");
    }
}