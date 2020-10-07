import { Router, Request, Response, NextFunction } from "express";

const routes = Router();

export default routes.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
  }
);
