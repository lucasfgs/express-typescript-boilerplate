import { Router, Request, Response, NextFunction } from "express";
import UserController from "@controllers/UserController";

const routes = Router();

routes.get("/", UserController.index);

routes.get("/:user_id", UserController.show);

routes.post("/", UserController.create);

routes.patch("/", UserController.update);
export default routes;
