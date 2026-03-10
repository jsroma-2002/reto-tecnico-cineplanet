import { Router } from "express";
import {
  getPremieresController,
  seedController,
  healthController,
} from "../controllers/premiere.controller.js";

const router = Router();

/**
 * @openapi
 * /premieres:
 *   get:
 *     summary: Obtener listado de estrenos
 *     description: Retorna la lista completa de premieres (imágenes y textos)
 *     tags:
 *       - Premieres
 *     responses:
 *       200:
 *         description: Lista de estrenos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                   imageUrl:
 *                     type: string
 *                     example: "https://image.com/movie1.jpg"
 *                   title:
 *                     type: string
 *                     example: "Avengers"
 *                   description:
 *                     type: string
 *                     example: "Nueva película de Marvel"
 *       500:
 *         description: Error interno del servidor
 */
router.get("/premieres", getPremieresController);

/**
 * @openapi
 * /seed:
 *   post:
 *     summary: Seed de datos de prueba
 *     description: Borra la colección actual e inserta datos de prueba. Solo disponible si ENABLE_SEED_ENDPOINT=true.
 *     tags:
 *       - Seed
 *     responses:
 *       201:
 *         description: Seed ejecutado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seed ejecutado exitosamente"
 *                 count:
 *                   type: number
 *                   example: 5
 *       403:
 *         description: Seed endpoint deshabilitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden: Seed endpoint is disabled"
 *       500:
 *         description: Error interno del servidor
 */
router.post("/seed", seedController);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Healthcheck del servicio
 *     description: Retorna el estado del servicio para monitoreo
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 service:
 *                   type: string
 *                   example: "premieres-service"
 */
router.get("/health", healthController);

export default router;
