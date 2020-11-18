import { IsEmail, MinLength, validateOrReject } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Company } from "./Company";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3, { message: "Name is too short" })
  name: string;

  @Column({ unique: true, nullable: false })
  @IsEmail({ allow_display_name: true }, { message: "Email is invalid" })
  email: string;

  @Column()
  @MinLength(6, { message: "Password is too short" })
  password: string;

  @ManyToOne(() => Company, (company) => company.employers)
  company: Company;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

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
