package world.moducare.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RecommendDto {
//     “productImg” : string,
// “productName” : string,
// “link” : string
// “price” : int,
// “productType” : string[]
    private String productImg;
    private String productName;
    private String link;
    private String price;
    private String[] productType;
}
