import { Request, Response, Router } from "express";
import { UserController } from "@controllers/UserController";
// import { authorize } from "@middlewares/authorize";
// import Role from "@constants/Roles";

const routes = Router();

// routes.get("/", authorize(Role.admin), new UserController().index);

routes.get("/", async (req: Request, res: Response) => {
  res.json(await new UserController().index());
});

// routes.get(
//   "/:user_id",
//   authorize([Role.user, Role.admin]),
//   new UserController().show
// );

routes.get("/:userId", async (req: Request, res: Response) => {
  res.json(await new UserController().show(+req.params.userId));
});

routes.post("/", async (req: Request, res: Response) => {
  res.json(await new UserController().create(req.body));
});

// routes.put(
//   "/",
//   authorize([Role.user, Role.admin]),
//   new UserController().update
// );

routes.put("/", async (req: Request, res: Response) => {
  const { user_id } = req.headers;
  res.json(await new UserController().update(+user_id, req.body));
});

// routes.delete("/", authorize(Role.admin), new UserController().destroy);

routes.delete("/", async (req: Request, res: Response) => {
  const { user_id } = req.headers;
  res.json(await new UserController().destroy(+user_id));
});

export default routes;
