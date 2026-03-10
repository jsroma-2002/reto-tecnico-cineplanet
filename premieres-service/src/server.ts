import app from "./app.js";
import { config } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { logger } from "./utils/logger.js";

async function start(): Promise<void> {
  await connectDB();

  app.listen(config.port, () => {
    logger.info(`Premieres Service iniciado en puerto ${config.port}`);
    logger.info(
      `Swagger UI disponible en http://localhost:${config.port}/api-docs`,
    );
  });
}

start().catch((error) => {
  logger.error("Error fatal al iniciar el servicio", { error });
  process.exit(1);
});
