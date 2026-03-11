import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import premiereRoutes from "./routes/premiere.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(premiereRoutes);
app.use(paymentRoutes);

app.use(errorHandler);

export default app;
