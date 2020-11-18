import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { MinLength, validateOrReject } from "class-validator";
import { User } from "./User";

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3, { message: "Company name is too short" })
  name: string;

  @OneToMany(() => User, (user) => user.company)
  employers: User[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private validate(): Promise<void> {
    return validateOrReject(this);
  }
}
