package ies301.space.infra.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${frontend.end}")
    private String frontend_host;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontend_host)
                .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH")
                //.allowedHeaders("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .allowedHeaders("*")
                .allowCredentials(true);
        
    }
}