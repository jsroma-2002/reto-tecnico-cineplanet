# Candystore Service

Microservicio de dulcería para cadena de cines Cineplanet. Retorna el listado de productos disponibles en la dulcería (popcorn, nachos, gaseosas, etc.).

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
| `SERVER_PORT` | Puerto del servicio | `8080` |
| `SPRING_DATASOURCE_URL` | URL de conexión MySQL | `jdbc:mysql://localhost:3306/cinema` |
| `SPRING_DATASOURCE_USERNAME` | Usuario de MySQL | `root` |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña de MySQL | `root` |
| `ENABLE_SEED_ENDPOINT` | Habilitar endpoint POST /candystore/seed | `false` |

## Base de datos

Ejecutar el script `init.sql` para crear la base de datos, tabla y stored procedure:

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
docker build -t candystore-service .
docker run -p 8081:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/cinema \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  -e ENABLE_SEED_ENDPOINT=true \
  candystore-service
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/candystore/products` | Listado de productos (via stored procedure) |
| POST | `/candystore/seed` | Seed de datos de prueba |
| GET | `/health` | Health check |
| GET | `/swagger-ui.html` | Documentación Swagger |

## Ejemplo de respuestas

### GET /candystore/products

```json
[
  {
    "id": 1,
    "name": "Popcorn",
    "description": "Popcorn grande con mantequilla",
    "price": 15.00
  },
  {
    "id": 2,
    "name": "Nachos",
    "description": "Nachos con queso cheddar",
    "price": 18.00
  }
]
```

### GET /health

```json
{
  "status": "ok",
  "service": "candystore-service"
}
```

### POST /candystore/seed

```json
{
  "message": "Seed ejecutado exitosamente",
  "count": 5,
  "data": [...]
}
```

## Estructura del proyecto

```
candystore-service/
├── src/main/java/com/cinema/candystore/
│   ├── CandystoreApplication.java
│   ├── config/
│   │   └── SwaggerConfig.java
│   ├── controller/
│   │   └── CandystoreController.java
│   ├── entity/
│   │   └── CandystoreProduct.java
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   ├── repository/
│   │   └── CandystoreRepository.java
│   └── service/
│       └── CandystoreService.java
├── src/main/resources/
│   ├── application.yml
│   └── schema.sql
├── init.sql
├── Dockerfile
├── pom.xml
└── README.md
```
