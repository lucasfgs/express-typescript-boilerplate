import { Router } from "express";
import CompanyController from "@controllers/CompanyController";

const routes = Router();

routes.get("/", CompanyController.index);

routes.get("/:company_id", CompanyController.show);

routes.post("/", CompanyController.create);

routes.patch("/", CompanyController.update);

routes.delete("/", CompanyController.destroy);

export default routes;
