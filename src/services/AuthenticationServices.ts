import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import { IUser, User } from "@models/User";
import { AuthenticationParams } from "@controllers/AuthController";

interface UserResponse extends IUser {
  password?: string;
  token: string;
}

type Response = UserResponse | Error;

export class AuthenticationService {
  public async execute({
    email,
    password,
  }: AuthenticationParams): Promise<Response> {
    const UserRepository = getRepository(User);
    try {
      const user: User = await UserRepository.findOneOrFail({
        relations: ["role"],
        where: { email, password },
      });
      if (!user) {
        throw new Error("Email or password incorrect!");
      }
      const token = jwt.sign(
        { id: user.id, role: user.role.name },
        process.env.JWT_SECRET
      );
      const { password: userPassword, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        token,
      };
    } catch (error) {
      throw new Error("Email or password incorrect!");
    }
  }
}
