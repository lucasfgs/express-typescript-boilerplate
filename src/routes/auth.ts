import { Request, Response, Router } from "express";
import { AuthenticationController } from "@controllers/AuthController";

const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
  const authController = new AuthenticationController();
  const response = await authController.authenticate({
    email: req.body.email,
    password: req.body.password,
  });

  res.json(response);
});

export default routes;
