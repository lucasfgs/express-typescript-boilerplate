import { Router, Request, Response, NextFunction } from "express";

const routes = Router();

/**
 * @swagger
 * /users:
 *    get:
 *      tags:
 *       - "users"
 *    summary: Returns a list of users.
 *    responses:
 *      '200':
 *        description: All users returned
 *      '400':
 *        description: Error fetching all users
 *
 */
routes.get("/", (req: Request, res: Response, next: NextFunction) => {
  //   res.send("Hello World!");
  res.status(400).send("error");
});

/**
 * @swagger
 *
 * /users/{user_id}:
 *    get:
 *      tags:
 *       - "users"
 *    summary: Returns a specific user.
 *    parameters:
 *      - in: path
 *        name: user_id
 *    responses:
 *      '200':
 *        description: User returned
 *      '400':
 *        description: Error fetching user
 *
 */
routes.get("/:user_id", (req: Request, res: Response, next: NextFunction) => {
  res.send(req.params);
});

export default routes;
