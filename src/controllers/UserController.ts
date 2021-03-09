import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";
import { Company } from "@models/Company";
import { Role } from "@models/Role";

export default {
  async index(req: Request, res: Response, next: NextFunction) {
    const UserRepository = await getRepository(User);
    try {
      const users = await UserRepository.find({
        relations: ["company", "role"],
      });
      res.send(users);
    } catch (error) {
      next("Cant get all users!");
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    const UserRepository = await getRepository(User);

    const { user_id } = req.params;
    try {
      const user = await UserRepository.findOneOrFail(user_id, {
        relations: ["company", "role"],
      });
      user ? res.json(user) : next("Cant get the specific user!");
    } catch (error) {
      next("Cant get the specific user!");
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    const CompanyRepository = await getRepository(Company);
    const RoleRepository = await getRepository(Role);
    const UserRepository = await getRepository(User);

    try {
      const { name, email, password, companyId, roleId } = req.body;

      const company = await CompanyRepository.findOneOrFail({
        where: { id: companyId },
      });
      const role = await RoleRepository.findOneOrFail({
        where: { id: roleId },
      });
      const user = await UserRepository.create({
        name,
        email,
        password,
        company,
        role,
      }).save();
      return res.status(201).send(user);
    } catch (error) {
      // Fix: error handling not working here
      // next(error);

      return res.status(400).json(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const UserRepository = await getRepository(User);

    const { name, email, password, companyId, roleId } = req.body;
    const { user_id } = req.headers;
    try {
      // const company = await Company.findOneOrFail({
      //   where: { id: companyId },
      // });
      // const role = await Role.findOneOrFail({
      //   where: { id: roleId },
      // });
      const user = await UserRepository.findOneOrFail(+user_id, {
        relations: ["company", "role"],
      });

      user.name = name;
      user.email = email;
      user.password = password;
      user.company = companyId;
      user.role = roleId;

      const updateduser = await user.save();
      // const user = await User.findOneOrFail(user_id as any, {
      //   relations: ["company", "role"],
      // });
      return res.status(200).send(updateduser);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    const UserRepository = await getRepository(User);

    try {
      const { user_id } = req.headers;
      const user = await UserRepository.delete(user_id);
      if (user.affected) {
        res.status(200).send("User were deleted!");
      } else {
        next("Error trying to deleted user!");
      }
    } catch (error) {
      next("Error trying to deleted user!");
    }
  },
};
