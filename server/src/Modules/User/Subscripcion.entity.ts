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
  ACTIVE = 'active', // La suscripción está activa.
  PAUSED = 'paused', // La suscripción ha sido pausada.
  CANCELLED = 'cancelled', // La suscripción ha sido cancelada.
  PENDING = 'pending', // La suscripción está pendiente de aprobación.
  APPROVED = 'approved', // La suscripción ha sido aprobada.
  REJECTED = 'rejected', // La suscripción ha sido rechazada.
  EXPIRED = 'expired', // La suscripción ha expirado.
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

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  @IsISO8601()
  fechaInicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  @IsISO8601()
  fechaUltimaPaga: Date;

  @Column({ type: 'timestamp', nullable: true })
  @IsISO8601()
  fechaVencimiento: Date;

  @Column({ unique: true, nullable: true })
  @IsString()
  mercadopagoSubscriptionId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
    nullable: true,
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

  @Column({ nullable: true })
  paymentMethodId: string; // Añadir el campo paymentMethodId
}
