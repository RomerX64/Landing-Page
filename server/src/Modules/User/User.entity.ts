import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscripcion } from './Subscripcion.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @OneToOne(() => Subscripcion, (subscripcion) => subscripcion.user, {
    cascade: true,
  })
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
