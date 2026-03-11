package com.cinema.candystore.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EntityManager entityManager;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Creando stored procedure get_candystore_products...");
        entityManager.createNativeQuery("DROP PROCEDURE IF EXISTS get_candystore_products").executeUpdate();
        entityManager.createNativeQuery(
                "CREATE PROCEDURE get_candystore_products() " +
                "BEGIN " +
                "    SELECT id, name, description, price FROM candystore_products; " +
                "END"
        ).executeUpdate();
        log.info("Stored procedure get_candystore_products creado exitosamente");
    }
}
