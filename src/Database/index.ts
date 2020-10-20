import { Sequelize } from "sequelize-typescript";

import User from "@models/User";
import Company from "@models/Company";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  models: [User, Company],
});
