import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";

@Table
class Users extends Model<Users> {
  @Column(DataType.INTEGER)
  @AutoIncrement
  @AllowNull(false)
  id: number;

  @Column(DataType.TEXT)
  @AllowNull(false)
  name: string;

  @Column(DataType.TEXT)
  @AllowNull(false)
  email: string;

  @Column(DataType.TEXT)
  @AllowNull(false)
  password: string;
}

export default Users;
