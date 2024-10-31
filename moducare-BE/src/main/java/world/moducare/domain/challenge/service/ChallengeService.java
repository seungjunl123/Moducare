package world.moducare.domain.challenge.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import world.moducare.domain.challenge.dto.ChallengeRequestDto;
import world.moducare.domain.challenge.entity.Challenge;
import world.moducare.domain.challenge.repository.ChallengeRepository;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    public void saveChallenge(ChallengeRequestDto requestDto) {

        Challenge challenge = Challenge.builder()
                .title(requestDto.getTitle())
                .image(requestDto.getChallengeImage())
                .build();

        challengeRepository.save(challenge);
    }
}
