import { Request, Response, Router } from "express";
import AuthController from "@controllers/AuthController";

const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
  const authController = new AuthController();
  const response = await authController.authenticate({
    email: req.body.email,
    password: req.body.password,
  });

  res.json(response);
});

export default routes;
