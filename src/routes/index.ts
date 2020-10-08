import { Router, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import { options } from "../config/swagger";
import users from "./api/v1";

const routes = Router();

routes.get("/users", users);

// API documentation route
if (process.env.ENV_MODE == "DEV")
  routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc(options)));

export default routes;
