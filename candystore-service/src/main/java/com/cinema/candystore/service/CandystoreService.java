package com.cinema.candystore.service;

import com.cinema.candystore.entity.CandystoreProduct;
import com.cinema.candystore.repository.CandystoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CandystoreService {

    private final CandystoreRepository repository;

    @Transactional
    public List<CandystoreProduct> getProducts() {
        log.info("Obteniendo productos de dulcería via stored procedure");
        List<CandystoreProduct> products = repository.getCandystoreProducts();
        log.info("Se encontraron {} productos", products.size());
        return products;
    }

    @Transactional
    public List<CandystoreProduct> seed() {
        log.info("Ejecutando seed de productos de dulcería");
        repository.deleteAll();

        List<CandystoreProduct> seedData = Arrays.asList(
                new CandystoreProduct(null, "Popcorn",
                        "Popcorn grande con mantequilla", new BigDecimal("15.00")),
                new CandystoreProduct(null, "Nachos",
                        "Nachos con queso cheddar", new BigDecimal("18.00")),
                new CandystoreProduct(null, "Hotdog",
                        "Hotdog clásico con salsas", new BigDecimal("12.00")),
                new CandystoreProduct(null, "Gaseosa",
                        "Gaseosa grande 32oz", new BigDecimal("10.00")),
                new CandystoreProduct(null, "Combo Familiar",
                        "2 Popcorn grandes + 4 gaseosas + nachos", new BigDecimal("55.00"))
        );

        List<CandystoreProduct> inserted = repository.saveAll(seedData);
        log.info("Seed completado: {} productos insertados", inserted.size());
        return inserted;
    }
}
