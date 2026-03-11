package com.cinema.complete.config;

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
        log.info("Creando stored procedure save_transaction...");
        entityManager.createNativeQuery("DROP PROCEDURE IF EXISTS save_transaction").executeUpdate();
        entityManager.createNativeQuery(
                "CREATE PROCEDURE save_transaction(" +
                "    IN p_email VARCHAR(150), " +
                "    IN p_name VARCHAR(150), " +
                "    IN p_dni VARCHAR(20), " +
                "    IN p_transaction_id VARCHAR(100), " +
                "    IN p_operation_date VARCHAR(50) " +
                ") " +
                "BEGIN " +
                "    INSERT INTO transactions (email, name, dni, transaction_id, operation_date) " +
                "    VALUES (p_email, p_name, p_dni, p_transaction_id, p_operation_date); " +
                "END"
        ).executeUpdate();
        log.info("Stored procedure save_transaction creado exitosamente");
    }
}
