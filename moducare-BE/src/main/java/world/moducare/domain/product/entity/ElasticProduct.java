package world.moducare.domain.product.entity;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.WriteTypeHint;

@Getter
@Setter
@Builder
@Document(indexName = "elastic_products", createIndex = true, writeTypeHint = WriteTypeHint.FALSE)
public class ElasticProduct {

    @Id
    private String id;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Field(type = FieldType.Keyword)
    private String 제품명;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Field(type = FieldType.Keyword)
    private String 가격;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Field(type = FieldType.Keyword)
    private String 제품_이미지;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Field(type = FieldType.Keyword)
    private String 제품_링크;

    @Column(columnDefinition = "TEXT")
    @Field(type = FieldType.Text)
    private String 세부제품특징;

    @Column(columnDefinition = "TEXT")
    @Field(type = FieldType.Text)
    private String 주요제품특징;

    @Column(columnDefinition = "TEXT")
    @Field(type = FieldType.Text)
    private String 헤어타입;

    @Column(columnDefinition = "TEXT")
    @Field(type = FieldType.Text)
    private String 두피타입;

    @Column(columnDefinition = "TEXT")
    @Field(type = FieldType.Text)
    private String 모발타입;

    @Field(type = FieldType.Dense_Vector, dims = 384)
    private float[] descriptionVector;

}
