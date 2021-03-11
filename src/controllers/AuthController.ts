import { Controller, Post, Route, Body, Tags } from "@tsoa/runtime";
import { AuthenticationService } from "@services/AuthenticationServices";

export interface AuthenticationParams {
  email: string;
  password: string;
}

@Route("auth")
@Tags("Authentication")
export class AuthenticationController extends Controller {
  @Post()
  public authenticate(
    @Body()
    params: AuthenticationParams
  ) {
    return new AuthenticationService().execute(params);
  }
}
