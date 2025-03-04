import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../User/Planes.entity';
import { User } from '../User/User.entity';
import { ErrorHandler } from '../../Utils/Error.Handler';
import * as bcrypt from 'bcrypt';
import { BillingCycle } from '../User/Planes.entity'; // Asegúrate de importar el enum si lo necesitas
import { signUp } from '../User/Dto/singUp.dto';
interface PreLoadPlan {
  imagen?: string;
  name: string;
  alt?: string;
  // El precio puede venir como number o string
  precio: number | string;
  activos: string;
  descripcion: string;
  popular?: boolean;
  billingCycle?: BillingCycle;
}

@Injectable()
export class UsersPreLoad implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}

  users: signUp[] = [
    {
      email: 'romer@gmail.com',
      company: 'Assetly',
      password: 'Paria!481632',
      telefono: '+54351532645',
      name: 'Romer',
    },
  ];

  planes: PreLoadPlan[] = [
    {
      imagen: 'WorkflowImg01',
      name: 'Free Pass',
      alt: 'Workflow 01',
      precio: 0,
      activos: '300',
      descripcion:
        'Podrá tener todas las funcionalidades del servicio, a excepción de las personalizaciones.',
      billingCycle: BillingCycle.MONTHLY, 
    },
    {
      imagen: 'WorkflowImg02',
      name: 'AssetsOK',
      alt: 'WorkflowImg02',
      precio: 80,
      activos: '500',
      descripcion:
        'En este plan podrá tener todas las funcionalidades, además de personalizaciones en Reportes.',
      billingCycle: BillingCycle.MONTHLY, 
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
      billingCycle: BillingCycle.MONTHLY, 
    },
    {
      imagen: 'WorkflowImg01',
      name: 'MegaAssets',
      alt: 'WorkflowImg01',
      precio: 300,
      activos: '10000',
      descripcion: 'Todo lo mencionado.',
      billingCycle: BillingCycle.MONTHLY, 
    },
    {
      imagen: 'WorkflowImg02',
      name: 'AssetsGod',
      alt: 'Workflow Img02',
      precio: 600,
      activos: '50000',
      descripcion: 'Todo lo mencionado.',
      billingCycle: BillingCycle.MONTHLY, 
    },
    {
      imagen: 'WorkflowImg03',
      name: 'Unlimit',
      alt: 'Workflow Img03',
      precio: 15000,
      activos: 'Sin límites',
      descripcion: 'Todo lo mencionado.',
      billingCycle: BillingCycle.MONTHLY, 
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
        // Buscamos el plan por su nombre
        const existingPlan = await this.planRepository.findOne({
          where: { name: planData.name },
        });

        let processedPrecio: number;
        // Procesamos el precio en caso de venir como string
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

        if (!existingPlan) {
          // Si el plan no existe, se crea uno nuevo
          const newPlan = this.planRepository.create({
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
          await this.planRepository.save(newPlan);
          console.log(`El plan con nombre ${planData.name} ha sido creado`);
        } else {
          // Si el plan ya existe, se actualizan sus propiedades
          existingPlan.descripcion = planData.descripcion;
          existingPlan.imagen = planData.imagen;
          existingPlan.alt = planData.alt;
          existingPlan.precio = Number(processedPrecio.toFixed(2));
          existingPlan.activos = planData.activos;
          existingPlan.popular = planData.popular || false;
          existingPlan.mercadopagoPlanId = `mp_${planData.name.toLowerCase().replace(/\s+/g, '_')}`;
          existingPlan.billingCycle = BillingCycle.MONTHLY;
          existingPlan.activo = true;
          existingPlan.fechaActualizacion = new Date();
          await this.planRepository.save(existingPlan);
          console.log(
            `El plan con nombre ${planData.name} ha sido actualizado`,
          );
        }
      }
      console.log('Planes cargados y actualizados con éxito');
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
