import { Router } from "express";
import RoleController from "@controllers/RoleController";

const routes = Router();

routes.get("/", RoleController.index);

routes.get("/:company_id", RoleController.show);

routes.post("/", RoleController.create);

routes.patch("/", RoleController.update);

routes.delete("/", RoleController.destroy);

export default routes;
