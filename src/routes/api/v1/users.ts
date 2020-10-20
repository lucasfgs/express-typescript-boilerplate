import { Router } from "express";
import UserController from "@controllers/UserController";

const routes = Router();

routes.get("/", UserController.index);

routes.get("/:user_id", UserController.show);

routes.post("/", UserController.create);

routes.patch("/", UserController.update);

routes.delete("/", UserController.destroy);

export default routes;
