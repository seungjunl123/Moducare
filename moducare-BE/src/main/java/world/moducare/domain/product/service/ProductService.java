package world.moducare.domain.product.service;

import org.springframework.stereotype.Service;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.product.dto.LatestProductDto;
import world.moducare.domain.product.entity.LatestProduct;
import world.moducare.domain.product.repository.LatestProductRepository;

@Service
public class ProductService {
    private final LatestProductRepository latestProductRepository;

    public ProductService(LatestProductRepository latestProductRepository) {
        this.latestProductRepository = latestProductRepository;
    }

    public void saveLatestProduct(Member member, LatestProductDto latestProductDto) {
        LatestProduct latestProduct = LatestProduct.builder()
                .imgSrc(latestProductDto.getImgSrc())
                .link(latestProductDto.getLink())
                .member(member)
                .build();
        latestProductRepository.save(latestProduct);
    }

    public LatestProductDto findLatestProduct(Member member) {
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