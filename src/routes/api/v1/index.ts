import { Router } from "express";

import users from "./users";
import companies from "./companies";

const routes = Router();

routes.use("/users", users);
routes.use("/companies", companies);

export default routes;
