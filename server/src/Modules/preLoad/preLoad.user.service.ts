import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../User/Planes.entity';
import { User } from '../User/User.entity';
import { ErrorHandler } from '../../Utils/Error.Handler';
import { MercadoPagoService } from './mp.service';
import * as bcrypt from 'bcrypt';
import { signUp } from '../User/Dto/singUp.dto';

@Injectable()
export class UsersPreLoad implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersPreLoad.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
    private mercadoPagoService: MercadoPagoService,
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

  // Planes predefinidos por si falla la carga desde Mercado Pago
  defaultPlans: Partial<Plan>[] = [
    {
      name: 'Free Pass',
      precio: 0,
      descripcion: 'Plan gratuito básico',
      activos: '300',
      mercadopagoPlanId: 'free_pass',
    },
    {
      name: 'AssetsOK',
      precio: 80,
      descripcion: 'Plan estándar',
      activos: '500',
      mercadopagoPlanId: 'assets_ok',
    },
    {
      name: 'UltraAssets',
      precio: 200,
      descripcion: 'Plan premium',
      activos: '2500',
      mercadopagoPlanId: 'ultra_assets',
    },
  ];

  async onApplicationBootstrap() {
    await this.preLoadUsers();
    await this.preLoadPlans();
  }

  async preLoadUsers() {
    try {
      for (const userData of this.users) {
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
     console.error('Error al cargar usuarios', error);
      throw ErrorHandler.handle(error);
    }
  }

  async preLoadPlans() {
    try {
      let plans = [];
      try {
        // Intenta cargar planes desde Mercado Pago
        plans = await this.mercadoPagoService.fetchPlans();
       console.log(`Cargados ${plans.length} planes desde Mercado Pago`);
      } catch (mercadoPagoError) {
        // Si falla, usa planes predefinidos
       console.warn('No se pudieron cargar planes desde Mercado Pago, usando planes predefinidos');
        plans = this.defaultPlans;
      }

      for (const planData of plans) {
        // Buscamos el plan por su ID de Mercado Pago o nombre
        const existingPlan = await this.planRepository.findOne({
          where: [
            { mercadopagoPlanId: planData.id || planData.mercadopagoPlanId },
            { name: planData.name }
          ],
        });

        if (!existingPlan) {
          // Si el plan no existe, se crea uno nuevo
          const newPlan = this.planRepository.create({
            name: planData.name,
            mercadopagoPlanId: planData.mercadopagoPlanId,
            precio: planData.price || planData.precio,
            descripcion: planData.description || planData.descripcion || `Plan ${planData.name}`,
            activo: true,
            imagen: 'default-plan-image',
            alt: `Plan ${planData.name}`,
          });
          await this.planRepository.save(newPlan);
         console.log(`El plan con nombre ${newPlan.name} ha sido creado`);
        } else {
          // Si el plan ya existe, actualizamos sus propiedades
          existingPlan.name = planData.name;
          existingPlan.precio = planData.price || planData.precio;
          existingPlan.descripcion = planData.description || planData.descripcion || existingPlan.descripcion;
          existingPlan.fechaActualizacion = new Date();
          await this.planRepository.save(existingPlan);
         console.log(`El plan con nombre ${existingPlan.name} ha sido actualizado`);
        }
      }
     console.log('Planes cargados y actualizados con éxito');
    } catch (error) {
     console.error('Error al cargar planes', error);
      throw ErrorHandler.handle(error);
    }
  }
}