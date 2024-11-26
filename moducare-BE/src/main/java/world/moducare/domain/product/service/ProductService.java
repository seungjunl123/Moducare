package world.moducare.domain.product.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.product.dto.LatestProductDto;
import world.moducare.domain.product.entity.LatestProduct;
import world.moducare.domain.product.repository.LatestProductRepository;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final LatestProductRepository latestProductRepository;

    public void saveLatestProduct(Member member, LatestProductDto latestProductDto) {
        Optional<LatestProduct> existingProduct = latestProductRepository.findByMember(member);

        LatestProduct latestProduct;
        if (existingProduct.isPresent()) {
            // 기존 엔티티 업데이트
            latestProduct = existingProduct.get();
            latestProduct.update(latestProductDto.getImgSrc(), latestProductDto.getLink());
            // 변경된 엔티티는 트랜잭션 종료 시점에 자동으로 업데이트됩니다.
        } else {
            // 새로운 엔티티 생성 및 저장
            latestProduct = LatestProduct.builder()
                    .imgSrc(latestProductDto.getImgSrc())
                    .link(latestProductDto.getLink())
                    .member(member)
                    .build();
        }
        latestProductRepository.save(latestProduct);
    }

    public LatestProductDto findLatestProduct(Member member) {
        if (member == null) {
            return null; // member가 null이면 바로 null 반환
        }

        LatestProduct latestProduct = latestProductRepository.findByMember(member).orElse(null);
        if (latestProduct == null) {
            return null;
        } else {
            return LatestProductDto.builder()
                    .imgSrc(latestProduct.getImgSrc())
                    .link(latestProduct.getLink())
                    .build();
        }
    }
}
