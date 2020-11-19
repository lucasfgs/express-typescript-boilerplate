import { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import jwt from "jsonwebtoken";
import { User } from "@models/User";

export default {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const connection = await createConnection();
    try {
      const { email, password } = req.body;
      const user = await User.findOneOrFail({
        relations: ["role"],
        where: { email, password },
      });
      if (user) {
        const token = jwt.sign(
          { id: user.id, role: user.role.name },
          process.env.JWT_SECRET
        );
        const { password, ...userWithoutPassword } = user;
        res.json({
          ...userWithoutPassword,
          token,
        });
      } else {
        next("Email or password incorrect!");
      }
    } catch (error) {
      res.status(400).json({ message: "Email or password incorrect!" });
    } finally {
      connection.close();
    }
  },
};
