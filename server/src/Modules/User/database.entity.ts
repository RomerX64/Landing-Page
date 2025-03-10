import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Subscripcion } from './Subscripcion.entity';

@Entity({
  name: 'databases',
})
export class Database {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Subscripcion, (subscripcion) => subscripcion.database)
  @JoinColumn()
  subscripcion: Subscripcion;

  @Column({ nullable: true })
  DB_NAME: string;

  @Column({ nullable: true })
  DB_HOST: string;

  @Column({ nullable: true })
  DB_PORT: number;

  @Column({ nullable: true })
  DB_USERNAME: string;

  @Column({ nullable: true })
  @Exclude() // Excluye este campo de las respuestas
  DB_PASSWORD: string;

  // Campo para guardar el IV (vector de inicialización) usado en la encriptación
  @Column({ nullable: true })
  @Exclude()
  encryptionIV: string;

  // URL del servicio web
  @Column({ nullable: true })
  url: string;
}
