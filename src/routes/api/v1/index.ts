import { Router } from "express";

import users from "./users";
import companies from "./companies";
import roles from "./roles";

const routes = Router();

routes.use("/users", users);
routes.use("/companies", companies);
routes.use("/roles", roles);

export default routes;
