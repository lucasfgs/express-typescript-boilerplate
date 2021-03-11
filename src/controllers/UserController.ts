import { UserServices } from "@services/UserServices";
import { Delete } from "@tsoa/runtime";
import { Route, Post, Body, Tags, Put, Get, Header } from "@tsoa/runtime";

export interface UserParams {
  name: string;
  email: string;
  password: string;
  companyId?: number;
  roleId?: number;
}

@Route("users")
@Tags("User")
export class UserController {
  @Get("")
  public index() {
    return new UserServices().findAll();
  }

  @Get("{userId}")
  public show(userId: number): Promise<UserParams> {
    return new UserServices().findOne(userId);
  }
  @Post()
  public create(
    @Body()
    params: UserParams
  ): Promise<UserParams> {
    return new UserServices().create(params);
  }

  @Put()
  public update(
    @Header("user_id")
    id: number,
    @Body()
    params: UserParams
  ) {
    return new UserServices().update(id, params);
  }

  @Delete()
  public async destroy(
    @Header("user_id")
    id: number
  ) {
    return new UserServices().delete(id);
  }
}
