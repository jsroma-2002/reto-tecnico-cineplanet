package com.cinema.complete.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI completeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Complete Service API")
                        .description("Microservicio de finalización de transacciones - Cineplanet")
                        .version("1.0.0"));
    }
}
