import { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "@models/User";
import { Company } from "@models/Company";
import { Role } from "@models/Role";

export default {
  async index(req: Request, res: Response) {
    const connection = await createConnection();
    try {
      const users = await User.find({ relations: ["company", "role"] });
      res.send(users);
    } catch (error) {
      res.status(400).send("Cant get all users!");
    } finally {
      connection.close();
    }
  },
  async show(req: Request, res: Response) {
    const connection = await createConnection();

    const { user_id } = req.params;
    try {
      const user = await User.findOneOrFail(user_id, {
        relations: ["company", "role"],
      });
      user
        ? res.json(user)
        : res.status(400).send("Cant get the specific user!");
    } catch (error) {
      res.status(400).send("Cant get the specific user!");
    } finally {
      connection.close();
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    const connection = await createConnection();

    try {
      const { name, email, password, companyId, roleId } = req.body;

      const company = await Company.findOneOrFail({ where: { id: companyId } });
      const role = await Role.findOneOrFail({ where: { id: roleId } });
      const user = await User.create({
        name,
        email,
        password,
        company,
        role,
      }).save();
      return res.status(201).send(user);
    } catch (error) {
      next(error);
    } finally {
      connection.close();
    }
  },
  async update(req: Request, res: Response) {
    const connection = await createConnection();
    const { name, email, password, companyId, roleId } = req.body;
    const { user_id } = req.headers;
    try {
      const company = await Company.findOneOrFail({
        where: { id: companyId },
      });
      const role = await Role.findOneOrFail({
        where: { id: roleId },
      });
      await User.update(user_id, { name, email, password, company, role });
      const user = await User.findOneOrFail(user_id as any, {
        relations: ["company", "role"],
      });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send("Error trying to update user!");
    } finally {
      connection.close();
    }
  },
  async destroy(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { user_id } = req.headers;
      const user = await User.delete(user_id);
      if (user.affected) {
        res.status(200).send("User were deleted!");
      } else {
        res.status(400).send("Error trying to deleted user!");
      }
    } catch (error) {
      res.status(400).send("Error trying to deleted user!");
    } finally {
      connection.close();
    }
  },
};
