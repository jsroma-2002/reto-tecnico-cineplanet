package com.cinema.complete.controller;

import com.cinema.complete.dto.TransactionRequest;
import com.cinema.complete.service.CompleteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CompleteController {

    private final CompleteService service;

    @Tag(name = "Transacciones")
    @Operation(summary = "Completar transacción",
            description = "Registra una transacción exitosa después de la aprobación de PayU")
    @PostMapping("/complete")
    public ResponseEntity<Map<String, String>> complete(@Valid @RequestBody TransactionRequest request) {
        log.info("POST /complete - transactionId={}", request.getTransactionId());
        try {
            service.saveTransaction(request);
            return ResponseEntity.ok(Map.of(
                    "code", "0",
                    "message", "transaction completed"
            ));
        } catch (Exception ex) {
            log.error("Error al completar transacción: {}", ex.getMessage(), ex);
            return ResponseEntity.internalServerError().body(Map.of(
                    "code", "1",
                    "message", "error completing transaction"
            ));
        }
    }

    @Tag(name = "Health")
    @Operation(summary = "Health check", description = "Verifica que el servicio está activo")
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "service", "complete-service"
        ));
    }
}
