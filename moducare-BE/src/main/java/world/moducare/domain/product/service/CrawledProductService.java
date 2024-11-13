package world.moducare.domain.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import world.moducare.domain.product.entity.CrawledProduct;
import world.moducare.domain.product.repository.CrawledProductRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CrawledProductService {

    private final CrawledProductRepository crawledProductRepository;

    @Autowired
    public CrawledProductService(CrawledProductRepository crawledProductRepository) {
        this.crawledProductRepository = crawledProductRepository;
    }

    public List<CrawledProduct> getRandomProductsByKeyword(String keyword, int count) {
        List<CrawledProduct> productsWithKeyword = crawledProductRepository.findByKeywordInFeatures(keyword);

        // 무작위로 섞고, 상위 'count'개의 항목을 반환
        Collections.shuffle(productsWithKeyword);
        return productsWithKeyword.stream()
                                  .limit(count)
                                  .collect(Collectors.toList());
    }
}
