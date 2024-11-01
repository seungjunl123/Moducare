package world.moducare.domain.challengefeed.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import world.moducare.domain.challenge.entity.Challenge;
import world.moducare.domain.challenge.repository.ChallengeRepository;
import world.moducare.domain.challengefeed.dto.FeedRequestDto;
import world.moducare.domain.challengefeed.entity.ChallengeFeed;
import world.moducare.domain.challengefeed.repository.ChallengeFeedRepository;
import world.moducare.domain.member.entity.Member;
import world.moducare.global.exception.ErrorCode;
import world.moducare.global.exception.RestApiException;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ChallengeFeedService {

    private final ChallengeFeedRepository challengeFeedRepository;
    private final ChallengeRepository challengeRepository;

    public void saveFeed(Member member, Long challengeId, FeedRequestDto requestDto) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        // 오늘 날짜에 동일한 member와 challenge가 존재하는지 확인
        boolean exists = challengeFeedRepository.existsByChallengeAndMemberAndToday(member.getId(), challengeId, LocalDate.now());

        // 중복된 경우 예외 발생
        if(exists){
            throw new RestApiException(ErrorCode.CONFLICT);
        }

        // 중복이 아니라면 ChallengeFeed 생성 및 저장
        ChallengeFeed challengeFeed = ChallengeFeed.builder()
                .image(requestDto.getFeedImg())
                .content(requestDto.getContent())
                .member(member)
                .challenge(challenge)
                .build();

        challengeFeedRepository.save(challengeFeed);
    }
}
