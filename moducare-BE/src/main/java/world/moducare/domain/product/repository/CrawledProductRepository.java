package world.moducare.domain.product.repository;

import world.moducare.domain.product.entity.CrawledProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrawledProductRepository extends JpaRepository<CrawledProduct, Long> {
    // 필요에 따라 추가 메서드 정의 가능
}
