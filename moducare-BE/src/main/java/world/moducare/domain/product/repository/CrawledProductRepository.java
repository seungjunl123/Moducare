package world.moducare.domain.product.repository;

import org.springframework.data.jpa.repository.Query;
import world.moducare.domain.product.entity.CrawledProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrawledProductRepository extends JpaRepository<CrawledProduct, Long> {
    @Query("SELECT p FROM CrawledProduct p " +
            "WHERE p.세부제품특징 LIKE %:keyword% " +
            "OR p.주요제품특징 LIKE %:keyword% " +
            "OR p.헤어타입 LIKE %:keyword% " +
            "OR p.두피타입 LIKE %:keyword% " +
            "OR p.모발타입 LIKE %:keyword%")
    List<CrawledProduct> findByKeywordInFeatures(String keyword);
}
