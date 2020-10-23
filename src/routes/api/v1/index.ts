import { Router } from "express";

import auth from "./auth";
import users from "./users";
import companies from "./companies";
import roles from "./roles";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", users);
routes.use("/companies", companies);
routes.use("/roles", roles);

export default routes;
