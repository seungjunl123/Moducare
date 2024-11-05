package world.moducare.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import world.moducare.domain.member.dto.ModifyRequest;
import world.moducare.domain.member.dto.SocialLoginResponse;
import world.moducare.domain.member.dto.TokenRequest;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.repository.MemberRepository;
import world.moducare.domain.product.repository.LatestProductRepository;
import world.moducare.global.exception.ErrorCode;
import world.moducare.global.exception.RestApiException;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final LatestProductRepository latestProductRepository;

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
    }

    public Member findById(Long userId) {
        return memberRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
    }

    public SocialLoginResponse saveFcmAndRefresh(Long id, TokenRequest tokenRequest) {
        String fcmToken = tokenRequest.getFcmToken();
        String refreshToken = tokenRequest.getRefreshToken();
        Member member = memberRepository.findById(id).orElseThrow(()->new RestApiException(ErrorCode.NOT_FOUND));
        member.updateRefreshAndFcm(refreshToken, fcmToken);
        memberRepository.save(member);
        return SocialLoginResponse.builder().name(member.getName()).birth(member.getBirth()).email(member.getEmail()).build();
    }


    private String formatHistory(ZonedDateTime reportTime, String violationTypeName) {
        // 원하는 형식으로 포맷팅
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        String formattedDate = reportTime.format(formatter);
        return formattedDate + " / " + violationTypeName;
    }

    public void logout(Member member) {
        member.logout();
        memberRepository.save(member);
    }

    @Transactional
    public void deleteMember(Member member) {
        memberRepository.delete(member);
    }

    public void modifyMember(Member member, ModifyRequest modifyRequest) {
        String name = modifyRequest.getName();
        String birth = modifyRequest.getBirth();
        member.modify(name, birth);
        memberRepository.save(member);
    }
}
