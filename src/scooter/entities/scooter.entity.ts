import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isRentting: boolean;
}
