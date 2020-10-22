import { Request, Response, NextFunction } from "express";
import { createConnection } from "typeorm";
import { User } from "@models/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    const connection = await createConnection();
    //Get user role from the database
    let user: User;
    try {
      user = await User.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    } finally {
      connection.close();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role.name) > -1) next();
    else res.status(401).send();
  };
};
