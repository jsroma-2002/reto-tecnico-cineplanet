package com.cinema.candystore.repository;

import com.cinema.candystore.entity.CandystoreProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandystoreRepository extends JpaRepository<CandystoreProduct, Long> {

    @Query(value = "CALL get_candystore_products()", nativeQuery = true)
    List<CandystoreProduct> getCandystoreProducts();
}
