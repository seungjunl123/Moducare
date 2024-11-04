package world.moducare.domain.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.product.entity.LatestProduct;

import java.util.Optional;

public interface LatestProductRepository extends JpaRepository<LatestProduct, Long> {
    Optional<LatestProduct> findByMember(Member member);
}
