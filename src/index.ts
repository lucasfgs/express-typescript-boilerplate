import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import { options } from "./config/swagger";

import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(helmet());
app.use(routes);

// API documentation route
if (process.env.ENV_MODE === "DEV")
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc(options)));

// app.listen(port);
app.listen(port, () =>
  console.log(`✔ Server listening at: ${process.env.HOST}:${port}`)
);
