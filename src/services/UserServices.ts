import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { UserParams } from "@controllers/UserController";

import { IUser, User } from "@models/User";
import { Company } from "@models/Company";
import { Role } from "@models/Role";
import { Put } from "@tsoa/runtime";

export class UserServices {
  public async findAll(): Promise<User[]> {
    const UserRepository = await getRepository(User);
    try {
      const users = await UserRepository.find({
        relations: ["company", "role"],
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOne(userId: number): Promise<User> {
    const UserRepository = await getRepository(User);

    try {
      const user = await UserRepository.findOneOrFail(userId, {
        relations: ["company", "role"],
      });
      return user ? user : undefined;
    } catch (error) {
      throw new Error(error);
      // next("Cant get the specific user!");
    }
  }

  public async create({
    name,
    email,
    password,
    companyId,
    roleId,
  }: UserParams): Promise<User | undefined> {
    const CompanyRepository = await getRepository(Company);
    const RoleRepository = await getRepository(Role);
    const UserRepository = await getRepository(User);

    try {
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

      return user;
    } catch (error) {
      // next(error);
      throw new Error(error);
    }
  }

  public async update(
    id: number,
    { name, email, password, companyId, roleId }: UserParams
  ) {
    const UserRepository = await getRepository(User);

    try {
      const company = await Company.findOneOrFail({
        where: { id: companyId },
      });
      const role = await Role.findOneOrFail({
        where: { id: roleId },
      });
      const user = await UserRepository.findOneOrFail(id, {
        relations: ["company", "role"],
      });

      user.name = name;
      user.email = email;
      user.password = password;
      user.company = company;
      user.role = role;

      const updateduser = await user.save();
      return updateduser;
    } catch (error) {
      throw new Error(error);
      // return res.status(400).json(error);
    }
  }

  public async delete(id: number): Promise<string> {
    const UserRepository = await getRepository(User);

    try {
      const user = await UserRepository.delete(id);
      if (user.affected) {
        return "User were deleted!";
      } else {
        throw new Error("Error trying to deleted user!");
        // next("Error trying to deleted user!");
      }
    } catch (error) {
      throw new Error("Error trying to deleted user!");

      // next("Error trying to deleted user!");
    }
  }
}
