import express from "express";
import cors from "cors";

import apiRoutes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "VOICED backend is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;