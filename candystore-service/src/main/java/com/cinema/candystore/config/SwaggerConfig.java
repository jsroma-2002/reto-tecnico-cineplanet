package com.cinema.candystore.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI candystoreOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Candystore Service API")
                        .description("Microservicio de dulcería - Cineplanet")
                        .version("1.0.0"));
    }
}
