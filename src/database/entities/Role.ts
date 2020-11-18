import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { IsNotEmpty, validateOrReject } from "class-validator";

import { User } from "./User";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @ManyToOne(() => User, (user) => user.role)
  users: User[];

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
