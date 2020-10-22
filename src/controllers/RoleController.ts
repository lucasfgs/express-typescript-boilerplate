import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Role } from "@models/Role";

export default {
  async index(req: Request, res: Response) {
    const connection = await createConnection();
    try {
      const roles = await Role.find({ relations: ["users"] });
      res.send(roles);
    } catch (error) {
      //   res.status(400).send(error);
      res.status(400).send("Cant get all roles!");
    } finally {
      connection.close();
    }
  },
  async show(req: Request, res: Response) {
    const connection = await createConnection();

    const { role_id } = req.params;
    try {
      const role = await Role.findOneOrFail(role_id, {
        relations: ["users"],
      });
      role
        ? res.send(role)
        : res.status(400).send("Cant get the specific role!");
    } catch (error) {
      res.status(400).send("Cant get the specific role!");
    } finally {
      connection.close();
    }
  },
  async create(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { name } = req.body;
      const UserRepository = connection.getRepository(Role);
      const role = await UserRepository.create({ name }).save();
      res.status(201).send(role);
    } catch (error) {
      res.send(400).send("Invalid parameters!");
    } finally {
      connection.close();
    }
  },
  async update(req: Request, res: Response) {
    const connection = await createConnection();
    const { name } = req.body;
    const { role_id } = req.headers;
    try {
      await Role.update(role_id, { name });
      const role = await Role.findOneOrFail(role_id as any, {
        relations: ["users"],
      });
      res.status(200).send(role);
    } catch (error) {
      res.status(400).send("Error trying to update role!");
    } finally {
      connection.close();
    }
  },
  async destroy(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { role_id } = req.headers;
      const role = await Role.delete(role_id);
      if (role.affected) {
        res.status(200).send("Role were deleted!");
      } else {
        res.status(400).send("Error trying to deleted role!");
      }
    } catch (error) {
      res.status(400).send("Error trying to deleted role!");
    } finally {
      connection.close();
    }
  },
};
