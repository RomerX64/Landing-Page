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

@Entity({
  name: 'subscriciones',
})
export class Subscripcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plan, (Plan) => Plan.subscripciones)
  @JoinColumn()
  plan: Plan;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaUltimaPaga: Date;

  @Column()
  fechaVenciento: Date;

  @OneToOne(() => User, (User) => User.subscripcion)
  @JoinColumn()
  user: User;
}
