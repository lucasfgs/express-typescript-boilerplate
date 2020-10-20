import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Unique,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import Company from "@models/Company";

@Table
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @ForeignKey(() => Company)
  @Column
  comapnyId: number;
}

export default User;
