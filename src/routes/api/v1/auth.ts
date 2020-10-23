import { Router } from "express";
import AuthController from "@controllers/AuthController";

const routes = Router();

routes.post("/", AuthController.authenticate);

export default routes;
