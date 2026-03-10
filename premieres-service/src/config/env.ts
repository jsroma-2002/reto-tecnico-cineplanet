import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/premieres",
  enableSeedEndpoint: process.env.ENABLE_SEED_ENDPOINT === "true",
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
  rateLimitMaxRequests: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || "100",
    10,
  ),
} as const;
