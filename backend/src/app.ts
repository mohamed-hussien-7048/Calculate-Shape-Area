import express from "express";
import { resolve } from "node:path";

import healthRouter from "./routes/health.routes.js";
import shapeRouter from "./modules/shapes/shape.routes.js";

const frontendPath = resolve(
    process.cwd(),
    "..",
    "frontend"
);

const app = express();

app.use(express.static(frontendPath));
app.use(express.json());

app.use("/api", healthRouter);
app.use("/api/shapes", shapeRouter);

export default app;