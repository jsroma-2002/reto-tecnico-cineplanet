import mongoose from "mongoose";
import { config } from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("Conexión exitosa a MongoDB");
  } catch (error) {
    logger.error("Error al conectar a MongoDB", { error });
    process.exit(1);
  }
}
