import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscripcion } from './Subscripcion.entity';

export enum BillingCycle {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descripcion: string;

  @Column({
    type: 'varchar',
    nullable: false, 
    transformer: {
      to: (value: number | string) => {
        return value !== null && value !== undefined
          ? value.toString()
          : 'Sin límites';
      },
      from: (value: string) => value,
    },
  })
  activos: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value, // Al guardar, se utiliza el número
      from: (value: string) => parseFloat(value), // Al leer, se transforma a número
    },
  })
  precio: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true })
  imagen?: string;

  @Column({ nullable: true })
  alt?: string;

  @Column({ default: false })
  popular: boolean;

  @Column({ unique: true })
  mercadopagoPlanId: string;

  @Column({
    type: 'enum',
    enum: BillingCycle,
    default: BillingCycle.MONTHLY,
  })
  billingCycle: BillingCycle;

  @OneToMany(() => Subscripcion, (subscripcion) => subscripcion.plan)
  subscripciones: Subscripcion[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaActualizacion: Date;
}
