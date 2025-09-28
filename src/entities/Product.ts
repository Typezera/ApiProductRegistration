import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
  user: User;
}
