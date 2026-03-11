package com.cinema.candystore.controller;

import com.cinema.candystore.entity.CandystoreProduct;
import com.cinema.candystore.service.CandystoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CandystoreController {

    private final CandystoreService service;

    @Value("${app.enable-seed-endpoint:false}")
    private boolean enableSeedEndpoint;

    @Tag(name = "Productos")
    @Operation(summary = "Obtener productos de dulcería",
            description = "Retorna el listado completo de productos usando stored procedure")
    @GetMapping("/candystore/products")
    public ResponseEntity<List<CandystoreProduct>> getProducts() {
        log.info("GET /candystore/products");
        List<CandystoreProduct> products = service.getProducts();
        return ResponseEntity.ok(products);
    }

    @Tag(name = "Seed")
    @Operation(summary = "Seed de datos de prueba",
            description = "Limpia la tabla e inserta productos de prueba. Solo disponible si ENABLE_SEED_ENDPOINT=true")
    @PostMapping("/candystore/seed")
    public ResponseEntity<?> seed() {
        log.info("POST /candystore/seed");

        if (!enableSeedEndpoint) {
            log.warn("Intento de acceso a /seed con endpoint deshabilitado");
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Forbidden: Seed endpoint is disabled"));
        }

        List<CandystoreProduct> products = service.seed();
        return ResponseEntity.ok(Map.of(
                "message", "Seed ejecutado exitosamente",
                "count", products.size(),
                "data", products
        ));
    }

    @Tag(name = "Health")
    @Operation(summary = "Health check", description = "Verifica que el servicio está activo")
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "service", "candystore-service"
        ));
    }
}
