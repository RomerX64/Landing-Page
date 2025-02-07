import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Plan } from './Planes.entity';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'subscriciones',
})
export class Subscripcion {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @ManyToOne(() => Plan, (plan) => plan.subscripciones)
  @JoinColumn()
  plan: Plan;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaUltimaPaga: Date;

  @Column()
  fechaVencimiento: Date;

  @OneToOne(() => User, (user) => user.subscripcion)
  @JoinColumn()
  user: User;
}
