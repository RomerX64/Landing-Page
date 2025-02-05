import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscripcion } from './Subscripcion.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descripcion: string;

  @Column()
  precio: string;

  @Column()
  activos: string;

  @Column({ nullable: true })
  imagen?: string;

  @Column({ nullable: true })
  alt?: string;

  @Column({ default: false })
  popular?: boolean;

  @OneToMany(() => Subscripcion, (subscripcion) => subscripcion.plan)
  subscripciones: Subscripcion[];
}
