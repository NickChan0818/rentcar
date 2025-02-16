import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rent } from '../../rent/entities/rent.entity';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isRentting: boolean;

  @OneToMany(() => Rent, (rent) => rent.scooter)
  rents: Rent[];
}
