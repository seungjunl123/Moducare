package world.moducare.global.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import world.moducare.global.config.jwt.TokenProvider;

import java.io.IOException;

@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    // 요청이 오면 헤더값을 비교해서 유효 토큰인지 확인
    // 유효토큰이면 시큐리티 콘텍스트 홀더에 인증 정보 저장
    // 시큐리티 컨텍스트 = 인증 객체가 저장되는 보관소
    // 스레드마다 공간을 할당(스레드 로컬에 존재) -> 아무곳에서나 참조 가능, 스레드 별 독립적 사용 가능
    // 시큐리티 컨텍스트 객체를 저장하는 객체 : 시큐리티 컨텍스트 홀더
    private final TokenProvider tokenProvider;
    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/v3/api-docs")
                || path.startsWith("/swagger-ui")
                || path.startsWith("/swagger-ui.html")
                || path.startsWith("/api/tokens/refresh")
                || path.startsWith("/api/health-check")
                || path.startsWith("/swagger-resources")
                || path.startsWith("/webjars/")
                || path.startsWith("/api/v3/api-docs");
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 요청 경로 확인
        String requestURI = request.getRequestURI();
        // 로그인 또는 토큰 재발급 요청이면 토큰 검증을 하지 않음
        if (requestURI.equals("/api/members/login/kakao")
                || requestURI.equals("/api/members/login/naver")
                || requestURI.equals("/api/members/login/google")
                || requestURI.equals("/api/tokens/refresh")
                || requestURI.equals("/api/login/oauth2/code/kakao")) { // Exclude OAuth callback path
            filterChain.doFilter(request, response);
            return;
        }

        // 요청 헤더의 Authorization 키의 값 조회
        // 가져온 값에서 접두사 제거
        String token = getAccessToken(request.getHeader(HEADER_AUTHORIZATION));
        // 가져온 토큰이 유효한지 확인하고, 유효한 때는 인증 정보 설정
        if (token != null && tokenProvider.validToken(token)) {
            Authentication authentication = tokenProvider.getAuthentication(token); // 인증 정보를 가져오면 유저 객체가 반환된다.
            // 유저 객체에는 유저 이름과 권한 목록과 같은 인증 정보가 포함
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            // 토큰이 만료되거나 유효하지 않을 경우
            SecurityContextHolder.clearContext();
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired or invalid");
            return;
        }

        filterChain.doFilter(request, response);
    }


    private String getAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            return authorizationHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }
}
