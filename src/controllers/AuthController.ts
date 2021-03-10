import { Controller, Post, Route } from "@tsoa/runtime";
import { Body } from "@tsoa/runtime";
import { AuthenticationService } from "@services/AuthenticationServices";

export interface AuthenticationParams {
  email: string;
  password: string;
}

@Route("auth")
class AuthenticationController extends Controller {
  @Post()
  public authenticate(
    @Body()
    params: AuthenticationParams
  ) {
    return new AuthenticationService().execute(params);
  }
}

export default AuthenticationController;
