import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@models/User";
import { UserServices } from "@services/UserServices";
import { Route } from "@tsoa/runtime";
import { Post } from "@tsoa/runtime";
import { Body } from "@tsoa/runtime";

export interface UserBodyParams {
  name: string;
  email: string;
  password: string;
  companyId: number;
  roleId: number;
}

@Route("users")
export class UserController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const UserRepository = await getRepository(User);
    try {
      const users = await UserRepository.find({
        relations: ["company", "role"],
      });
      res.send(users);
    } catch (error) {
      next("Cant get all users!");
    }
  }
  public async show(req: Request, res: Response, next: NextFunction) {
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
  }
  @Post()
  public async create(
    @Body()
    params: UserBodyParams
  ): Promise<User> {
    return new UserServices().create(params);
  }
  public async update(req: Request, res: Response, next: NextFunction) {
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
  }
  public async destroy(req: Request, res: Response, next: NextFunction) {
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
  }
}
