package com.cinema.complete.service;

import com.cinema.complete.dto.TransactionRequest;
import com.cinema.complete.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompleteService {

    private final TransactionRepository repository;

    @Transactional
    public void saveTransaction(TransactionRequest request) {
        log.info("Guardando transacción: transactionId={}, email={}", request.getTransactionId(), request.getEmail());
        repository.saveTransaction(
                request.getEmail(),
                request.getName(),
                request.getDni(),
                request.getTransactionId(),
                request.getOperationDate()
        );
        log.info("Transacción guardada exitosamente: {}", request.getTransactionId());
    }
}
