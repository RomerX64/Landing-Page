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
    {
      email: 'tomiromera2903@gmail.com',
      company: 'Assetly',
      password: '',
      telefono: '',
      name: 'Tomas Romera',
    },
    {
      email: 'assetlysuport@gmail.com',
      company: 'Assetly',
      password: '',
      telefono: '',
      name: 'Assetly',
    },
  ];

  defaultPlans: Partial<Plan>[] = [
    {
      name: 'Free Pass',
      activos: '300',
    },
    {
      name: 'AssetsOK',
      activos: '500',
    },
    {
      name: 'UltraAssets',
      activos: '2500',
    },
    {
      name: 'MegaAssets',
      activos: '10000',
    },
    {
      name: 'Unlimit',
      activos: '50000',
    },
    {
      name: 'AssetsGod',
      activos: '50000',
    },
  ];

  async onApplicationBootstrap() {
    this.logger.log('Starting application bootstrap');
    await this.preLoadUsers();
    await this.preLoadPlans();
    this.logger.log('Finished application bootstrap');
  }

  async preLoadUsers() {
    try {
      this.logger.log('Starting user preload');

      for (const userData of this.users) {
        // Skip users with empty passwords
        if (!userData.password) {
          this.logger.warn(
            `Skipping user ${userData.email} due to empty password`,
          );
          continue;
        }

        let existingUser = await this.userRepository.findOne({
          where: { email: userData.email },
        });

        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
          });
          user.isAdmin = true;
          await this.userRepository.save(user);
          this.logger.log(`Created new admin user: ${userData.email}`);
        } else {
          this.logger.log(`Updating existing user: ${userData.email}`);
          const hashedPassword = await bcrypt.hash(userData.password, 10);
          existingUser.password = hashedPassword;
          await this.userRepository.save(existingUser);
        }
      }

      this.logger.log('Users preloaded successfully');
    } catch (error) {
      this.logger.error('Error loading users', error);
      throw ErrorHandler.handle(error);
    }
  }

  async preLoadPlans() {
    try {
      this.logger.log('Starting plans preload');
      let plans = [];

      try {
        // Attempt to load plans from Mercado Pago
        const mpPlans = await this.mercadoPagoService.fetchPlans();
        this.logger.log(`Loaded ${mpPlans?.length} plans from Mercado Pago`);

        // Transform Mercado Pago data to the expected format
        plans = mpPlans.map((mpPlan) => {
          // Find the corresponding default plan by name
          const defaultPlan = this.defaultPlans.find(
            (p) => p.name === mpPlan.name,
          );

          return {
            name: mpPlan.name,
            mercadopagoPlanId: mpPlan.mercadopagoPlanId,
            precio: mpPlan.price,
            descripcion: mpPlan.description,
            activos: defaultPlan?.activos || '500', // Use assets from defaultPlan or fallback
            activo: true, // All MP plans should be active
            popular: mpPlan.name === 'UltraAssets', // Only UltraAssets is popular
            imagen: 'default-plan-image',
            alt: `Plan ${mpPlan.name}`,
            fechaActualizacion: new Date(),
          };
        });
      } catch (mercadoPagoError) {
        // If MP fails, use predefined plans
        this.logger.warn(
          'Failed to load plans from Mercado Pago, using default plans',
          mercadoPagoError,
        );

        // Add default values to the plans
        plans = this.defaultPlans.map((plan) => ({
          ...plan,
          precio: 0, // Default price
          descripcion: `Plan ${plan.name}`, // Default description
          popular: plan.name === 'UltraAssets', // Only UltraAssets is popular
          activo: true,
          imagen: 'default-plan-image',
          alt: `Plan ${plan.name}`,
          fechaActualizacion: new Date(),
        }));
      }

      for (const planData of plans) {
        // Search for the plan by Mercado Pago ID or name
        const existingPlan = await this.planRepository.findOne({
          where: [
            ...(planData.mercadopagoPlanId
              ? [{ mercadopagoPlanId: planData.mercadopagoPlanId }]
              : []),
            { name: planData.name },
          ],
        });

        if (!existingPlan) {
          // If the plan doesn't exist, create a new one
          const newPlan = this.planRepository.create({
            name: planData.name,
            mercadopagoPlanId: planData.mercadopagoPlanId,
            precio: planData.precio || 0,
            descripcion: planData.descripcion || `Plan ${planData.name}`,
            activos: planData.activos,
            activo: true, // All new plans should be active
            popular: planData.name === 'UltraAssets', // Only UltraAssets is popular
            imagen: planData.imagen || 'default-plan-image',
            alt: planData.alt || `Plan ${planData.name}`,
            fechaActualizacion: new Date(),
          });
          await this.planRepository.save(newPlan);
          this.logger.log(`Created new plan: ${newPlan.name}`);
        } else {
          // If the plan already exists, update its properties
          existingPlan.name = planData.name;
          existingPlan.precio = planData.precio ?? existingPlan.precio ?? 0;

          if (planData.mercadopagoPlanId) {
            existingPlan.mercadopagoPlanId = planData.mercadopagoPlanId;
          }

          existingPlan.descripcion =
            planData.descripcion ||
            existingPlan.descripcion ||
            `Plan ${planData.name}`;
          existingPlan.activos = planData.activos || existingPlan.activos;
          existingPlan.popular = planData.name === 'UltraAssets'; // Only UltraAssets is popular
          existingPlan.imagen =
            planData.imagen || existingPlan.imagen || 'default-plan-image';
          existingPlan.alt =
            planData.alt || existingPlan.alt || `Plan ${planData.name}`;
          existingPlan.fechaActualizacion = new Date();

          await this.planRepository.save(existingPlan);
          this.logger.log(`Updated existing plan: ${existingPlan.name}`);
        }
      }

      this.logger.log('Plans loaded and updated successfully');
    } catch (error) {
      this.logger.error('Error loading plans', error);
      throw ErrorHandler.handle(error);
    }
  }
}
