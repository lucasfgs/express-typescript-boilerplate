import { Router, Request, Response, NextFunction } from "express";

const routes = Router();

/**
 * @swagger
 * /users:
 *  get:
 *    description: Return all users
 *    responses:
 *      '200':
 *        description: A successful response
 *
 */
routes.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

export default routes;
