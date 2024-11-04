package world.moducare.domain.diagnosis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import world.moducare.domain.diagnosis.dto.DiagnosisResponseDto;
import world.moducare.domain.diagnosis.dto.DiagnosticResultDto;
import world.moducare.domain.diagnosis.entity.DiagnosticResult;
import world.moducare.domain.diagnosis.repository.DiagnosticResultRepository;
import world.moducare.domain.member.entity.Member;
import world.moducare.global.exception.ErrorCode;
import world.moducare.global.exception.RestApiException;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RequiredArgsConstructor
@Service
public class DiagnosticResultService {
    private final DiagnosticResultRepository diagnosticResultRepository;

    public List<DiagnosisResponseDto> getDiagnosticList(Member member) {
        List<DiagnosticResult> results = diagnosticResultRepository.findAllByMemberOrderByCreatedAtDesc(member).orElse(null);
        if (results == null) {
            return new ArrayList<>();
        }

        List<DiagnosisResponseDto> diagnosisResponseDtoList = new ArrayList<>();
        for (DiagnosticResult result : results) {
            DiagnosisResponseDto diagnosisResponseDto = DiagnosisResponseDto.builder()
                    .id(result.getId())
                    .date(formatToCustomString(result.getCreatedAt()))
                    .diagnosis(result.getResult())
                    .build();

            diagnosisResponseDtoList.add(diagnosisResponseDto);
        }

        return diagnosisResponseDtoList;
    }

    public DiagnosticResultDto getDiagnosis(Long diagnosisId, Member member) {
        DiagnosticResult diagnosticResult = diagnosticResultRepository.findByMemberAndId(member, diagnosisId).orElseThrow(()->new RestApiException(ErrorCode.NOT_FOUND));
        int[] result = new int[6];
        result[0] = diagnosticResult.getHairLoss();
        result[1] = diagnosticResult.getDandruff();
        result[2] = diagnosticResult.getInflammatory();
        result[3] = diagnosticResult.getErythema();
        result[4] = diagnosticResult.getSebum();
        result[5] = diagnosticResult.getDeadSkin();

        return DiagnosticResultDto.builder()
                .image(diagnosticResult.getImage())
                .manageComment(diagnosticResult.getAdvice())
                .result(result)
                .comparison(diagnosticResult.getComparison())
                .date(formatToCustomString(diagnosticResult.getCreatedAt()))
                .build();
    }

    // YYYY-MM-DD 오전/오후 HH:MM:SS 형식으로 변환
    public static String formatToCustomString(ZonedDateTime zonedDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd a hh:mm:ss", Locale.KOREAN);
        return zonedDateTime.format(formatter);
    }
}
