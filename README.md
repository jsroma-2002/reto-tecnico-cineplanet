# 🎬 Cinema Ecommerce — Reto Técnico Cineplanet

Sistema de ecommerce para una cadena de cines compuesto por un frontend React y tres microservicios backend, orquestados con Docker Compose.

## Servicios

### cinema-frontend

Frontend SPA desarrollado con React 19, Vite, Redux Toolkit y React Router. Incluye:

- **Home** — listado de estrenos (consume premieres-service)
- **Login** — Google Sign-In o modo invitado
- **Dulcería** — catálogo de productos con carrito de compras (consume candystore-service)
- **Pago** — formulario de pago simulado con PayU e integración con complete-service

Servido en producción con Nginx.

### premieres-service

Microservicio Node.js + Express + TypeScript + MongoDB. Gestiona el catálogo de estrenos de cine.

| Endpoint | Método | Descripción |
|---|---|---|
| `/premieres` | GET | Listado de estrenos |
| `/payments` | POST | Simulación de pago PayU |
| `/seed` | POST | Carga de datos iniciales |
| `/health` | GET | Health check |

**Swagger:** [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

### candystore-service

Microservicio Java 11 + Spring Boot + MySQL. Gestiona el catálogo de productos de dulcería.

| Endpoint | Método | Descripción |
|---|---|---|
| `/candystore/products` | GET | Listado de productos |
| `/candystore/seed` | POST | Carga de datos iniciales |
| `/health` | GET | Health check |

**Swagger:** [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)

### complete-service

Microservicio Java 11 + Spring Boot + MySQL. Registra transacciones de compra completadas.

| Endpoint | Método | Descripción |
|---|---|---|
| `/complete` | POST | Registrar transacción finalizada |
| `/health` | GET | Health check |

**Swagger:** [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)

---

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose

---

## Configuración

Antes de levantar el sistema, crea un archivo `.env` en la raíz del proyecto:

```env
VITE_GOOGLE_CLIENT_ID=TU_GOOGLE_CLIENT_ID_REAL
```

Reemplaza `TU_GOOGLE_CLIENT_ID_REAL` por tu Client ID de Google OAuth 2.0.
Puedes obtener uno desde [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

> Si no configuras esta variable, el login con Google no funcionará, pero el modo invitado seguirá disponible.

---

## Levantar el sistema

```bash
docker compose up --build
```

Esto construirá y levantará los 6 contenedores:

| Servicio | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Premieres Service | http://localhost:3001 |
| Candystore Service | http://localhost:8081 |
| Complete Service | http://localhost:8082 |
| MongoDB | localhost:27017 |
| MySQL | localhost:3306 |

### Cargar datos iniciales

Una vez levantado el sistema, ejecuta los seeders:

```bash
# Estrenos
curl -X POST http://localhost:3001/seed

# Productos de dulcería
curl -X POST http://localhost:8081/candystore/seed
```

---

## Detener el sistema

```bash
docker compose down
```

Para eliminar también los volúmenes de datos:

```bash
docker compose down -v
```

---

## Flujo de usuario

```
Home → Login → Dulcería → Carrito → Pago → Compra exitosa
```
