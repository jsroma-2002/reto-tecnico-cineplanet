# Complete Service

Microservicio de finalización de transacciones para cadena de cines Cineplanet. Recibe los datos de una transacción exitosa (post-pago PayU), los almacena en base de datos y retorna confirmación.

## Tecnologías

- Java 11
- Spring Boot 2.7
- Maven
- MySQL 8
- JPA / Hibernate
- Stored Procedures
- Swagger (springdoc-openapi)
- Lombok
- SLF4J + Logback
- Docker

## Requisitos

- Java 11+
- Maven 3.8+
- MySQL 8 (o Docker)

## Configuración

Variables de entorno:

| Variable | Descripción | Default |
|---|---|---|
| `SERVER_PORT` | Puerto del servicio | `8082` |
| `SPRING_DATASOURCE_URL` | URL de conexión MySQL | `jdbc:mysql://localhost:3306/cinema` |
| `SPRING_DATASOURCE_USERNAME` | Usuario de MySQL | `root` |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña de MySQL | `root` |

## Base de datos

Ejecutar el script `init.sql` para crear la tabla:

```bash
mysql -u root -p < init.sql
```

## Ejecución local

```bash
mvn spring-boot:run
```

## Compilación

```bash
mvn clean package
```

## Ejecución con Docker

```bash
docker build -t complete-service .
docker run -p 8082:8082 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/cinema \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  complete-service
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/complete` | Registrar transacción completada |
| GET | `/health` | Health check |
| GET | `/swagger-ui.html` | Documentación Swagger |

## Ejemplo de request y response

### POST /complete

**Request:**
```json
{
  "email": "cliente@email.com",
  "name": "Juan Perez",
  "dni": "12345678",
  "transactionId": "PAYU-123456789",
  "operationDate": "2026-03-10T20:15:00"
}
```

**Response (éxito):**
```json
{
  "code": "0",
  "message": "transaction completed"
}
```

**Response (error):**
```json
{
  "code": "1",
  "message": "error completing transaction"
}
```

### GET /health

```json
{
  "status": "ok",
  "service": "complete-service"
}
```

## Estructura del proyecto

```
complete-service/
├── src/main/java/com/cinema/complete/
│   ├── CompleteApplication.java
│   ├── config/
│   │   ├── DataInitializer.java
│   │   └── SwaggerConfig.java
│   ├── controller/
│   │   └── CompleteController.java
│   ├── dto/
│   │   └── TransactionRequest.java
│   ├── entity/
│   │   └── Transaction.java
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   ├── repository/
│   │   └── TransactionRepository.java
│   └── service/
│       └── CompleteService.java
├── src/main/resources/
│   └── application.yml
├── init.sql
├── Dockerfile
├── pom.xml
└── README.md
```
