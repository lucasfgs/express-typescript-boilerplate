import { Request, Response, Router } from "express";
import { UserController } from "@controllers/UserController";
import { authorize } from "@middlewares/authorize";
import Role from "@constants/Roles";

const routes = Router();

routes.get("/", authorize(Role.admin), new UserController().index);

routes.get(
  "/:user_id",
  authorize([Role.user, Role.admin]),
  new UserController().show
);

routes.post("/", (req: Request, res: Response) => {
  return new UserController().create(req.body);
});

routes.patch(
  "/",
  authorize([Role.user, Role.admin]),
  new UserController().update
);

routes.delete("/", authorize(Role.admin), new UserController().destroy);

export default routes;
