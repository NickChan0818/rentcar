import { Rent } from 'src/rent/entities/rent.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column()
  birthday: Date;

  @Column({ length: 32, nullable: true })
  phone: string;

  @Column({ length: 512 })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isVoid: boolean;

  @Column({ length: 512 })
  password: string;

  @OneToMany(() => Rent, (rent) => rent.user)
  rents: Rent[];
}
