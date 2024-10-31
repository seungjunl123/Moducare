package world.moducare.domain.challenge.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import world.moducare.domain.challenge.dto.ChallengeRequestDto;
import world.moducare.domain.challenge.service.ChallengeService;

@RestController
@RequiredArgsConstructor
@Tag(name = "챌린지 컨트롤러", description = "챌린지 관련 API")
@RequestMapping("/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping()
    @Operation(summary="챌린지 생성 API")
    public ResponseEntity<Void> makeChallenge(@RequestBody ChallengeRequestDto requestDto) {
        challengeService.saveChallenge(requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
