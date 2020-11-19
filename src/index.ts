import "dotenv/config";
import "reflect-metadata";

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import apiDocumentation from "./docs/api";

import routes from "./routes/api";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api", routes);

// API documentation route
if (process.env.ENV_MODE === "DEV")
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// WHEN BUILDING COMMENT THIS BLOCK
app.listen(port, () =>
  console.log(`✔ Server listening at: ${process.env.HOST}:${port}`)
);
