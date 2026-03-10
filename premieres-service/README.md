# Premieres Service

Microservicio de estrenos (premieres) para una cadena de cines. Retorna un listado de películas próximas a estrenarse con imágenes y textos descriptivos.

## Tecnologías utilizadas

- **Node.js** (v18+)
- **Express** — Framework HTTP
- **TypeScript** — Tipado estático
- **MongoDB** + **Mongoose** — Base de datos y ODM
- **Winston** — Logging estructurado
- **Swagger (OpenAPI)** — Documentación interactiva de API
- **express-rate-limit** — Protección contra abuso de peticiones
- **dotenv** — Variables de entorno
- **Docker** — Contenerización

## Requisitos

- Node.js >= 18
- MongoDB (local o remoto)
- Docker (opcional)

## Instalación

```bash
npm install
```

## Configuración

Copia el archivo de ejemplo y ajusta los valores:

```bash
cp .env.example .env
```

### Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/premieres` |
| `ENABLE_SEED_ENDPOINT` | Habilitar/deshabilitar endpoint de seed | `true` |
| `RATE_LIMIT_WINDOW_MS` | Ventana de rate limiting en milisegundos | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de peticiones por ventana | `100` |

## Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

### Ejecución con Docker

```bash
docker build -t premieres-service .
docker run -p 3000:3000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/premieres \
  -e ENABLE_SEED_ENDPOINT=true \
  premieres-service
```

## Endpoints

### GET /premieres

Retorna la lista completa de estrenos.

**Respuesta exitosa (200):**

```json
[
  {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "imageUrl": "https://image.tmdb.org/t/p/w500/avengers-endgame.jpg",
    "title": "Avengers: Secret Wars",
    "description": "Los héroes más poderosos de la Tierra se enfrentan a la mayor amenaza multiversal."
  }
]
```

### POST /seed

Borra la colección actual e inserta datos de prueba (5 registros). Solo disponible si `ENABLE_SEED_ENDPOINT=true`.

**Respuesta exitosa (201):**

```json
{
  "message": "Seed ejecutado exitosamente",
  "count": 5
}
```

**Respuesta cuando está deshabilitado (403):**

```json
{
  "error": "Forbidden: Seed endpoint is disabled"
}
```

### GET /health

Healthcheck del servicio para monitoreo.

**Respuesta (200):**

```json
{
  "status": "ok",
  "service": "premieres-service"
}
```

### GET /api-docs

Documentación interactiva Swagger UI.

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta la aplicación compilada (producción) |
