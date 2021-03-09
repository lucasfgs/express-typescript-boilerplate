import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Role } from "@models/Role";

export default {
  async index(req: Request, res: Response) {
    const RoleRepository = await getRepository(Role);
    try {
      const roles = await RoleRepository.find({ relations: ["users"] });
      res.send(roles);
    } catch (error) {
      //   res.status(400).send(error);
      res.status(400).send("Cant get all roles!");
    }
  },
  async show(req: Request, res: Response) {
    const RoleRepository = await getRepository(Role);

    const { role_id } = req.params;
    try {
      const role = await RoleRepository.findOneOrFail(role_id, {
        relations: ["users"],
      });
      role
        ? res.send(role)
        : res.status(400).send("Cant get the specific role!");
    } catch (error) {
      res.status(400).send("Cant get the specific role!");
    }
  },
  async create(req: Request, res: Response) {
    const RoleRepository = await getRepository(Role);

    try {
      const { name } = req.body;
      const role = await RoleRepository.create({ name }).save();
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async update(req: Request, res: Response) {
    const RoleRepository = await getRepository(Role);

    const { name } = req.body;
    const { role_id } = req.headers;
    try {
      const role = await RoleRepository.findOneOrFail(+role_id);

      role.name = name;

      const updatedRole = await role.save();

      res.status(200).send(updatedRole);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async destroy(req: Request, res: Response) {
    const RoleRepository = await getRepository(Role);

    try {
      const { role_id } = req.headers;
      const role = await RoleRepository.delete(role_id);
      if (role.affected) {
        res.status(200).send("Role were deleted!");
      } else {
        res.status(400).send("Error trying to deleted role!");
      }
    } catch (error) {
      res.status(400).send("Error trying to deleted role!");
    }
  },
};
