package world.moducare.domain.challenge.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import world.moducare.domain.challenge.dto.ChallengeRequestDto;
import world.moducare.domain.challenge.dto.ChallengeResponseDto;
import world.moducare.domain.challenge.entity.Challenge;
import world.moducare.domain.challenge.repository.ChallengeRepository;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.mychallenge.entity.MyChallenge;
import world.moducare.domain.mychallenge.entity.Status;
import world.moducare.domain.mychallenge.repository.MyChallengeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final MyChallengeRepository myChallengeRepository;

    public void saveChallenge(Member member, ChallengeRequestDto requestDto) {

        Challenge challenge = Challenge.builder()
                .title(requestDto.getTitle())
                .image(requestDto.getChallengeImage())
                .build();

        challengeRepository.save(challenge);

        // 마이 챌린지에 자동 추가
        MyChallenge myChallenge = MyChallenge.builder()
                .member(member)
                .status(Status.IN)
                .challenge(challenge)
                .build();

        myChallengeRepository.save(myChallenge);
    }

    public List<ChallengeResponseDto> getList(Member member) {

        List<Challenge> challenges = challengeRepository.findAvailableChallenges(member.getId());
        System.out.println(challenges.size());

        return challenges.stream().map(challenge -> ChallengeResponseDto.builder()
                    .challengeId(challenge.getId())
                    .challengeImg(challenge.getImage())
                    .challengeUser(challenge.getHeadCount())
                    .challengeName(challenge.getTitle())
                    .build()
                ).collect(Collectors.toList());
    }
}