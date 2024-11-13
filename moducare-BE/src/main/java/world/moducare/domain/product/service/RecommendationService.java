package world.moducare.domain.product.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.CountRequest;
import co.elastic.clients.elasticsearch.core.CountResponse;
import lombok.RequiredArgsConstructor;
import world.moducare.domain.product.dto.RecommendDto;
import world.moducare.domain.product.entity.ElasticProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import co.elastic.clients.elasticsearch._types.Script;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.ScriptScoreQuery;
import co.elastic.clients.json.JsonData;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    // ElasticsearchTemplate 객체를 통해 Elasticsearch 서버와 통신할 수 있게 설정
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Autowired
    private ElasticsearchClient elasticsearchClient;

    public long getDocumentCount(String indexName) {
        try {
            CountRequest countRequest = CountRequest.of(r -> r.index(indexName));
            CountResponse countResponse = elasticsearchClient.count(countRequest);
            return countResponse.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    /**
     * 사용자 임베딩을 기반으로 제품 추천 목록을 반환하는 메소드
     * @param userEmbedding 사용자 임베딩 벡터
     * @return 추천 제품 리스트
     */
    public List<RecommendDto> recommendProducts(float[] userEmbedding) {
        System.out.println(Arrays.toString(userEmbedding));
        // Elasticsearch에 전달할 파라미터로 사용하기 위해 임베딩 벡터를 JsonData 형식으로 변환
        Map<String, JsonData> params = new HashMap<>();
        params.put("query_vector", JsonData.of(userEmbedding));

        // Elasticsearch에서 코사인 유사도를 계산하기 위한 스크립트 설정
        Script script = Script.of(s -> s
                .inline(i -> i
                        .lang("painless") // 스크립트 언어로 "painless" 사용
                        .source("cosineSimilarity(params.query_vector, 'descriptionVector') + 1.0") // 코사인 유사도를 계산하는 스크립트
                        .params(params) // 쿼리 벡터를 파라미터로 전달
                )
        );

        // 모든 문서에 대해 스크립트 점수를 계산하도록 ScriptScoreQuery 설정
        Query scriptScoreQuery = ScriptScoreQuery.of(ssq -> ssq
                .query(q -> q.matchAll(m -> m)) // 모든 문서에 대해 쿼리 실행
                .script(script) // 코사인 유사도 스크립트 적용
        )._toQuery();

        // 검색 결과를 코사인 유사도 기준으로 내림차순 정렬하기 위한 정렬 옵션 설정
        SortOptions sortOptions = SortOptions.of(so -> so
                .score(s -> s.order(SortOrder.Desc)) // 스크립트 점수(score)로 내림차순 정렬
        );

        // 쿼리 빌더를 사용하여 쿼리를 구성, 첫 페이지에서 최대 100개의 결과를 반환하도록 설정
        NativeQueryBuilder queryBuilder = new NativeQueryBuilder()
                .withQuery(scriptScoreQuery) // 스크립트 쿼리 추가
                .withPageable(PageRequest.of(0, 100)) // 페이지당 최대 100개 결과
                .withSort(sortOptions); // 정렬 옵션 추가

        // Elasticsearch에서 쿼리 실행 후 검색 결과 획득
        SearchHits<ElasticProduct> searchHits = elasticsearchTemplate.search(queryBuilder.build(), ElasticProduct.class);

        // 추천 제품 목록을 저장할 리스트 생성
        List<RecommendDto> recommendDtoList = new ArrayList<>();

        // 검색 결과의 각 제품에 대해 정보를 추출하여 RecommendDto에 저장
        for (SearchHit<ElasticProduct> hit : searchHits) {
            ElasticProduct product = hit.getContent();

            String[] typeText =
                    ((product.get세부제품특징() == null ? "" : product.get세부제품특징().trim()+ ", ") +
                            (product.get주요제품특징() == null ? "" : product.get주요제품특징().trim()+ ", ") +
                            (product.get모발타입() == null ? "" : product.get모발타입().trim()+ ", ") +
                            (product.get두피타입() == null ? "" : product.get두피타입().trim()+ ", ") +
                            (product.get헤어타입() == null ? "" : product.get헤어타입().trim())).split(", ");

            RecommendDto recommendDto = RecommendDto.builder()
                    .productImg(product.get제품_이미지())
                    .productName(product.get제품명())
                    .link(product.get제품_링크())
                    .price(product.get가격())
                    .productType(typeText)
                    .build();

            recommendDtoList.add(recommendDto);
        }

        return recommendDtoList;
    }
}
