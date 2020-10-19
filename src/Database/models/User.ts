import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Unique,
} from "sequelize-typescript";

@Table
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  name: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  password: string;
}

export default User;
