package com.cinema.complete.repository;

import com.cinema.complete.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Modifying
    @Query(value = "CALL save_transaction(:email, :name, :dni, :transactionId, :operationDate)", nativeQuery = true)
    void saveTransaction(
            @Param("email") String email,
            @Param("name") String name,
            @Param("dni") String dni,
            @Param("transactionId") String transactionId,
            @Param("operationDate") String operationDate
    );
}
