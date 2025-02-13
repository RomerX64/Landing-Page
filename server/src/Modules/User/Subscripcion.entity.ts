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
import { IsEnum, IsISO8601, IsString } from 'class-validator';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'subscripciones' })
export class Subscripcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plan, (plan) => plan.subscripciones, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  plan: Plan;

  @OneToOne(() => User, (user) => user.subscripcion, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsISO8601()
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  @IsISO8601()
  fechaUltimaPaga: Date;

  @Column({ type: 'timestamp' })
  @IsISO8601()
  fechaVencimiento: Date;

  @Column({ unique: true })
  @IsString()
  mercadopagoSubscriptionId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;

  @Column({ type: 'timestamp', nullable: true })
  @IsISO8601()
  cancellationDate: Date;

  @Column({ type: 'text', nullable: true })
  cancellationReason: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;
}
