import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscripcion } from './Subscripcion.entity';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  username: string;

  @OneToOne(() => Subscripcion, (subscripcion) => subscripcion.user, {
    cascade: true,
  })
  @JoinColumn()
  subscripcion: Subscripcion;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telefono: string;

  @Column()
  company: string;

  @Column({ default: false })
  isAdmin: boolean;
}
