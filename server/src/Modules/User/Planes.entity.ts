import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscripcion } from './Subscripcion.entity';

@Entity({
  name: 'planes',
})
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  price: number;

  @OneToMany(() => Subscripcion, (Subscripcion) => Subscripcion.plan)
  @JoinTable()
  subscripciones: Subscripcion[];
}
