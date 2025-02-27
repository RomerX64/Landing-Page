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

  @Column({ nullable: true })
  name: string;

  @OneToOne(() => Subscripcion, (subscripcion) => subscripcion.user, {
    cascade: true,
  })
  subscripcion: Subscripcion;

  @Column({ default: false })
  emailVerified: boolean;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  company: string;

  @Column({ default: false })
  isAdmin: boolean;
}
