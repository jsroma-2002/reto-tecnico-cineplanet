package com.cinema.complete.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Datos de la transacción completada")
public class TransactionRequest {

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    @Size(max = 150)
    @Schema(example = "cliente@email.com")
    private String email;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 150)
    @Schema(example = "Juan Perez")
    private String name;

    @NotBlank(message = "El DNI es obligatorio")
    @Size(max = 20)
    @Schema(example = "12345678")
    private String dni;

    @NotBlank(message = "El ID de transacción es obligatorio")
    @Size(max = 100)
    @Schema(example = "PAYU-123456789")
    private String transactionId;

    @NotBlank(message = "La fecha de operación es obligatoria")
    @Size(max = 50)
    @Schema(example = "2026-03-10T20:15:00")
    private String operationDate;
}
