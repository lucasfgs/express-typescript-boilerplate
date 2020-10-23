import { Router } from "express";
import UserController from "@controllers/UserController";
import { authorize } from "@middlewares/authorize";
import Role from "@constants/Roles";

const routes = Router();

routes.get("/", authorize(Role.admin), UserController.index);

routes.get(
  "/:user_id",
  authorize([Role.user, Role.admin]),
  UserController.show
);

routes.post("/", UserController.create);

routes.patch("/", authorize(Role.user), UserController.update);

routes.delete("/", authorize(Role.admin), UserController.destroy);

export default routes;
