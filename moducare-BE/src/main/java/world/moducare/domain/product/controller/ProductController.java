package world.moducare.domain.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import world.moducare.domain.member.entity.Member;
import world.moducare.domain.member.service.MemberService;
import world.moducare.domain.product.dto.LatestProductDto;
import world.moducare.domain.product.service.ProductService;
import world.moducare.global.config.oauth.CustomOAuth2User;

@RequiredArgsConstructor
@RestController
@RequestMapping("/product")
@Tag(name = "Product API", description = "추천 제품 관련 API")
public class ProductController {

    private final MemberService memberService;
    private final ProductService productService;

    @PostMapping("/latest")
    @Operation(summary = "최근 본 상품 저장", description = "사용자가 가장 최근에 본 추천 제품을 저장")
    public ResponseEntity<?> saveLatestProduct(@AuthenticationPrincipal CustomOAuth2User principal, @RequestBody LatestProductDto latestProductDto) {
        Member member = memberService.findById(principal.getId());
        productService.saveLatestProduct(member, latestProductDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("최근 본 상품 저장 완료");
    }

    @GetMapping("/latest")
    @Operation(summary = "최근 본 상품 저장", description = "사용자가 가장 최근에 본 추천 제품을 저장")
    public ResponseEntity<LatestProductDto> getLatestProduct(@AuthenticationPrincipal CustomOAuth2User principal) {
        Member member = memberService.findById(principal.getId());
        LatestProductDto latestProductDto = productService.findLatestProduct(member);
        return ResponseEntity.status(HttpStatus.OK).body(latestProductDto);
    }
}