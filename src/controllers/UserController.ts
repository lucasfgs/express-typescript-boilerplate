import { Request, Response } from "express";
import User from "@models/User";

export default {
  async index(req: Request, res: Response) {
    try {
      let users = await User.findAll();
      res.send(users);
    } catch (error) {
      res.status(400).send("Cant get all users!");
    }
  },

  async show(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      let user = await User.findByPk(user_id);
      user
        ? res.send(user)
        : res.status(400).send("Cant get the specific user!");
    } catch (error) {
      res.status(400).send("Cant get the specific user!");
    }
  },

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      let user = await User.create({ name, email, password });
      res.status(201).send(user);
    } catch (error) {
      res.send(400).send("Invalid parameters!");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const { user_id } = req.headers;
      let user = await User.update(
        { name, email, password },
        { where: { id: user_id } }
      );
      user
        ? res.status(200).send("User updated!")
        : res.status(400).send("Error trying to update user!");
    } catch (error) {
      res.status(400).send("Error trying to update user!");
    }
  },

  async destroy(req: Request, res: Response) {
    try {
      const { user_id } = req.headers;
      let user = User.destroy({ where: { id: user_id } });
      user
        ? res.status(200).send("User deleted!")
        : res.status(400).send("Error trying to deleted user!");
    } catch (error) {
      res.status(400).send("Error trying to deleted user!");
    }
  },
};
