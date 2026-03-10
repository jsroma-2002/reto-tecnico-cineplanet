import type { Request, Response, NextFunction } from "express";
import { getPremieres, seedPremieres } from "../services/premiere.service.js";
import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";

export async function getPremieresController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    logger.info("GET /premieres");
    const premieres = await getPremieres();
    res.json(premieres);
  } catch (error) {
    next(error);
  }
}

export async function seedController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    logger.info("POST /seed");

    if (!config.enableSeedEndpoint) {
      logger.warn("Intento de acceso a /seed con endpoint deshabilitado");
      res.status(403).json({ error: "Forbidden: Seed endpoint is disabled" });
      return;
    }

    const premieres = await seedPremieres();
    res.status(201).json({
      message: "Seed ejecutado exitosamente",
      count: premieres.length,
    });
  } catch (error) {
    next(error);
  }
}

export function healthController(_req: Request, res: Response): void {
  logger.info("GET /health");
  res.json({ status: "ok", service: "premieres-service" });
}
