package world.moducare.global.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import world.moducare.domain.member.repository.MemberRepository;
import world.moducare.domain.member.service.MemberService;
import world.moducare.global.config.jwt.TokenProvider;
import world.moducare.global.config.oauth.OAuth2SuccessHandler;
import world.moducare.global.config.oauth.OAuth2UserCustomService;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig { // 실제 인증을 처리하는 시큐리티 설정 파일

    private final OAuth2UserCustomService oAuth2UserCustomService;
    private final TokenProvider tokenProvider;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    @Value("${redirect_uri}")
    private String REDIRECT_PATH;

    // 스프링 시큐리티 기능 비활성화
    // 스프링 시큐리티의 모든 기능을 사용하지 않게 설정 = 인증, 인가 서비스를 모든 곳에 적용하진 않는다
    @Bean
    public WebSecurityCustomizer configure() {
        // 정적 리소스만 스프링 시큐리티 사용을 비활성화
        return (web) -> web.ignoring()
//                .requestMatchers(toH2Console())
                .requestMatchers(new AntPathRequestMatcher("/static/**"));
        // static 하위 경로에 있는 리소스와 h2의 데이터를 확인하는데 사용하는 h2-console 하위 url 대상으로 ignore
    }

    // 특정 HTTP 요청에 대한 웹 기반 보안 구성
    // 인증/인가 및 로그인, 로그아웃 관련 설정 가능
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(withDefaults())
            .csrf(AbstractHttpConfigurer::disable) // csrf 비활성화 -> csrf 공격 방지하기 위해서는 활성화하는 게 좋지만 실습의 편리를 위해 지금은 비활
//                .csrf(csrf -> csrf
//                        .ignoringRequestMatchers(
//                                "/police/login",
//                                "/members/login",
//                                "/tokens/refresh"
//                        )  // 특정 경로에서 CSRF 비활성화
//                )
            // JWT 필터 추가 (일반 로그인 처리)
            .addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            
            // URL 접근 권한 설정
            .authorizeRequests(auth -> auth // 특정 경로에 대한 인증, 인가 액세스 설정
                .requestMatchers( // 특정 요청과 일치하는 url에 대한 액세스 설정
                        new AntPathRequestMatcher("/members/login"),
                        new AntPathRequestMatcher("/tokens/refresh"),
                        new AntPathRequestMatcher("/members/logout"),
                        new AntPathRequestMatcher("/challenges")
                ).permitAll()  // 누구나 접근이 가능하게 (/login, /police-login로 요청이 오면 인증,인가 없이도 접근 가능)
                .requestMatchers("/swagger-ui/**","/v3/api-docs/**").permitAll()
                .requestMatchers(
                        new AntPathRequestMatcher("/api/**")
                ).authenticated()
                .anyRequest().permitAll())
                // anyRequest()은 위에서 성정한 url 이외의 요청에 대해서 설정
                // authenticated()은 별도의 인가는 필요하지 않지만 인증이 성공된 상태여야 접근 가능

            // OAuth2 로그인 설정 (소셜 로그인 처리)
            .oauth2Login(oauth2 -> oauth2
                    .loginPage(REDIRECT_PATH+"/login") // OAuth2 로그인 페이지 URL 설정
                    // Authorization 요청과 관련된 상태 저장
                    .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(oAuth2UserCustomService))
                    // 인증 성공 시 실행할 핸들러
//                    .failureUrl("https://www.bardisue.store/login?error=true") // 로그인 실패 시 리디렉션할 URL 설정
//                    .defaultSuccessUrl(REDIRECT_PATH+"/social", true) // 로그인 성공 시 리디렉션할 URL 설정
                    .successHandler(oAuth2SuccessHandler()))
                // 인증 성공 시 실행할 핸들러도 설정

                .logout(logout -> logout // 로그아웃 설정
                        .logoutSuccessUrl(REDIRECT_PATH+"/login") // 로그아웃 완료되었을 떄 이동할 경로 설정
//                        .invalidateHttpSession(true) // 로그아웃 이후에 세션에서 전체 삭제할지 여부 설정
                )


            // 예외 처리
//                .exceptionHandling(exceptionHandling -> exceptionHandling
//                        .authenticationEntryPoint((request, response, authException) -> {
//                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed");
//                        })
//                        .accessDeniedHandler((request, response, accessDeniedException) -> {
//                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied");
//                        })
//                )
//                .build();
                // /api로 시작하는 url인 경우 401 상태 코드를 반환하도록 예외 처리
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .defaultAuthenticationEntryPointFor(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED), // 401 상태 코드
                                new AntPathRequestMatcher("/api/**")
                        ))
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3001");
        configuration.addAllowedOrigin("http://localhost:8080");
        configuration.addAllowedOrigin("https://k11b203.p.ssafy.io"); // 허용할 Origin 설정
        configuration.addAllowedMethod("*");  // 모든 메서드 허용 (GET, POST, PUT 등)
        configuration.addAllowedHeader("*");  // 모든 헤더 허용
        configuration.setAllowCredentials(true);  // 쿠키 및 인증 정보 허용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // 모든 경로에 대해 CORS 설정 적용
        return source;
    }


    // 인증 관리자 관련 설정
    // 사용자 정보를 가져올 서비스를 재정의하거나 인증 방법, 예를 들어 LDAP, JDBC 기반 인증 등을 설정할 때 사용
    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        // DaoAuthenticationProvider 설정을 제거하거나 다른 방식으로 설정
        return new ProviderManager(new DaoAuthenticationProvider());
    }

    // JWT 관련 설정
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(tokenProvider);
    }

    // OAuth2 관련 설정
    @Bean
    public OAuth2SuccessHandler oAuth2SuccessHandler() {
        return new OAuth2SuccessHandler(memberRepository, tokenProvider, memberService);
    }


    // 패스워드 인코더로 사용할 빈 등록
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// 인증은 보호된 리소스에 접근하는 것을 허용하기 이전에 등록된 사용자의 신원을 입증하는 과정
// 인가는 특정 부분에 접근할 수 있는지에 확인하는 작업
