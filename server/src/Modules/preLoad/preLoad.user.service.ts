import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { singUp } from '../User/Dto/singUp.dto';
import { Plan } from '../User/Planes.entity';
import { User } from '../User/User.entity';
import { ErrorHandler } from '../../Utils/Error.Handler';
import * as bcrypt from 'bcrypt';
import { BillingCycle } from '../User/Planes.entity'; // Asegúrate de importar el enum si lo necesitas
interface PreLoadPlan {
  imagen?: string;
  name: string;
  alt?: string;
  // El precio puede venir como number o string
  precio: number | string;
  activos: string;
  descripcion: string;
  popular?: boolean;
}

@Injectable()
export class UsersPreLoad implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}

  users: singUp[] = [
    {
      email: 'romer@gmail.com',
      company: 'Assetly',
      password: 'Paria!481632',
      telefono: '+54351532645',
      username: 'Romer',
    },
  ];

  // Se elimina el campo "id" ya que es autogenerado
  planes: PreLoadPlan[] = [
    {
      imagen: 'WorkflowImg01',
      name: 'Free Pass',
      alt: 'Workflow 01',
      precio: 0,
      activos: '300',
      descripcion:
        'Podrá tener todas las funcionalidades del servicio, a excepción de las personalizaciones.',
    },
    {
      imagen: 'WorkflowImg02',
      name: 'AssetsOK',
      alt: 'WorkflowImg02',
      precio: 80,
      activos: '500',
      descripcion:
        'En este plan podrá tener todas las funcionalidades, además de personalizaciones en Reportes.',
    },
    {
      imagen: 'WorkflowImg03',
      name: 'UltraAssets',
      alt: 'WorkflowImg03',
      precio: 200,
      activos: '2500',
      descripcion:
        'Tendrá todas las funcionalidades, y personalizaciones deseadas.',
      popular: true,
    },
    {
      imagen: 'WorkflowImg01',
      name: 'MegaAssets',
      alt: 'WorkflowImg01',
      precio: 300,
      activos: '10000',
      descripcion: 'Todo lo mencionado.',
    },
    {
      imagen: 'WorkflowImg02',
      name: 'AssetsGod',
      alt: 'Workflow Img02',
      precio: 600,
      activos: '50000',
      descripcion: 'Todo lo mencionado.',
    },
    {
      imagen: 'WorkflowImg03',
      name: 'Unlimit',
      alt: 'Workflow Img03',
      precio: 15000,
      activos: 'Sin límites',
      descripcion: 'Todo lo mencionado.',
    },
  ];

  async onApplicationBootstrap() {
    await this.preLoadUsers();
    await this.preLoadPlans();
  }

  async preLoadUsers() {
    try {
      for (const userData of this.users) {
        // Verificar si el usuario ya existe por su correo electrónico
        const existingUser = await this.userRepository.findOne({
          where: { email: userData.email },
        });

        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const user = this.userRepository.create(userData);
          user.isAdmin = true;
          user.password = hashedPassword;
          await this.userRepository.save(user);
        } else {
          console.log(`El usuario con correo ${userData.email} ya existe`);
        }
      }
      console.log('Usuarios cargados con éxito');
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async preLoadPlans() {
    try {
      for (const planData of this.planes) {
        const existingPlan = await this.planRepository.findOne({
          where: { name: planData.name },
        });

        if (!existingPlan) {
          let processedPrecio: number;
          // Si viene como string, lo procesamos; si ya es number, lo usamos directamente.
          if (typeof planData.precio === 'string') {
            if (planData.precio.toLowerCase() === 'free') {
              processedPrecio = 0;
            } else {
              const numericString = planData.precio.replace(/[^0-9.]/g, '');
              processedPrecio = parseFloat(numericString);
            }
          } else {
            processedPrecio = planData.precio;
          }

          // Convertimos el precio a string con dos decimales
          const plan = this.planRepository.create({
            name: planData.name,
            descripcion: planData.descripcion,
            imagen: planData.imagen,
            alt: planData.alt,
            precio: Number(processedPrecio.toFixed(2)),
            activos: planData.activos,
            popular: planData.popular || false,
            mercadopagoPlanId: `mp_${planData.name.toLowerCase().replace(/\s+/g, '_')}`,
            billingCycle: BillingCycle.MONTHLY,
            activo: true,
          });

          await this.planRepository.save(plan);
        } else {
          console.log(`El plan con nombre ${planData.name} ya existe`);
        }
      }
      console.log('Planes cargados con éxito');
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
