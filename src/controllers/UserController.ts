import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "@models/User";

export default {
  async index(req: Request, res: Response) {
    const connection = await createConnection();
    try {
      const users = await User.find();
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
      const user = await User.findOneOrFail(user_id);
      user
        ? res.send(user)
        : res.status(400).send("Cant get the specific user!");
    } catch (error) {
      res.status(400).send("Cant get the specific user!");
    } finally {
      connection.close();
    }
  },
  async create(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { name, email, password } = req.body;
      const UserRepository = connection.getRepository(User);
      const user = await UserRepository.create({
        name,
        email,
        password,
      }).save();
      res.status(201).send(user);
    } catch (error) {
      res.send(400).send("Invalid parameters!");
    } finally {
      connection.close();
    }
  },
  async update(req: Request, res: Response) {
    const connection = await createConnection();
    const { name, email, password } = req.body;
    const { user_id } = req.headers;
    try {
      await User.update(user_id, { name, email, password });
      const user = await User.findOneOrFail(user_id as any);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send("Error trying to update user!");
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
