import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { UserBodyParams } from "@controllers/UserController";

import { IUser, User } from "@models/User";
import { Company } from "@models/Company";
import { Role } from "@models/Role";

export class UserServices {
  public async create({
    name,
    email,
    password,
    companyId,
    roleId,
  }: UserBodyParams): Promise<User | undefined> {
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
      // Fix: error handling not working here
      // next(error);
      throw new Error(error);
    }
  }
}
