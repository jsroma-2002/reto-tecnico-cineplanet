package com.cinema.candystore;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class CandystoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(CandystoreApplication.class, args);
        log.info("=== candystore-service iniciado correctamente ===");
    }
}
