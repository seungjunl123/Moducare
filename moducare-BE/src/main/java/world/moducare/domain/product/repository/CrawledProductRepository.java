package world.moducare.domain.product.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import world.moducare.domain.product.entity.CrawledProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrawledProductRepository extends JpaRepository<CrawledProduct, Long>, JpaSpecificationExecutor<CrawledProduct> {

}