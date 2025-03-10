import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { Plan } from '../User/Planes.entity';
import { User } from '../User/User.entity';
import { UserService } from '../User/users.service';
import { SubscriptionsService } from '../Suscribe/suscriber.service';
import { MercadoPagoService } from './mp.service';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { updateUserDto } from '../User/Dto/updateUser.dto';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto';
import { MailService } from '../Mail/mail.service';
import { Database } from '../User/database.entity';
import { createServiceDto } from './dto/createService.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Database)
    private readonly databaseRepository: Repository<Database>,
    @InjectRepository(Subscripcion)
    private readonly subRepository: Repository<Subscripcion>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
    @Inject(forwardRef(() => SubscriptionsService))
    private readonly subService: SubscriptionsService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  // Usuarios
  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: [
          'subscripcion',
          'subscripcion.plan',
          'subscripcion.database',
        ],
      });
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: [
          'subscripcion',
          'subscripcion.plan',
          'subscripcion.database',
        ],
      });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async updateUser(
    userId: string,
    dataUserToUpdate: updateUserDto,
  ): Promise<User> {
    try {
      let user = await this.getUserById(userId);
      user = { ...user, ...dataUserToUpdate };
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const result = await this.userRepository.delete(userId);
      if (result.affected === 0) {
        throw new NotFoundException('Usuario no encontrado');
      }
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async putAdmin(userId: string): Promise<User> {
    try {
      const user = await this.getUserById(userId);
      user.isAdmin = true;
      await this.userRepository.update(userId, { isAdmin: true });
      return user;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUsersSubscribed(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { subscripcion: Not(IsNull()) },
        relations: ['subscripcion', 'subscripcion.plan'],
      });
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUsersSubscribedAt(planId: number): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { subscripcion: { plan: { id: planId } } },
        relations: ['subscripcion', 'subscripcion.plan'],
      });
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async verifyEmail(userId: string): Promise<User> {
    try {
      const user = await this.userService.getUserById(userId);
      await this.userRepository.update(user.id, { emailVerified: true });
      return await this.userService.getUserById(userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // Planes
  async getAllPlans(): Promise<Plan[]> {
    try {
      return await this.planRepository.find({ relations: ['subscripciones'] });
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async createPlan(planData: CreatePlanDto): Promise<Plan> {
    try {
      const plan = this.planRepository.create(planData);
      return await this.planRepository.save(plan);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async updatePlan(planId: number, updateData: UpdatePlanDto): Promise<Plan> {
    try {
      const plan = await this.planRepository.findOne({ where: { id: planId } });
      if (!plan) {
        throw new NotFoundException('Plan no encontrado');
      }
      const updatedPlan = { ...plan, ...updateData };
      await this.planRepository.save(updatedPlan);
      return updatedPlan;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async deletePlan(planId: number): Promise<void> {
    try {
      const result = await this.planRepository.delete(planId);
      if (result.affected === 0) {
        throw new NotFoundException('Plan no encontrado');
      }
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getAllSubscriptions(): Promise<Subscripcion[]> {
    try {
      return await this.subRepository.find({ relations: ['user', 'plan'] });
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getSubscriptionById(subscriptionId: string): Promise<Subscripcion> {
    try {
      const sub = await this.subRepository.findOne({
        where: { id: subscriptionId },
        relations: ['plan', 'database', 'user'],
      });
      if (!sub) throw new NotFoundException('Suscripción no encontrada');
      return sub;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async updateSubscriptionStatus(
    subscriptionId: string,
    status: SubscriptionStatus,
  ): Promise<Subscripcion> {
    try {
      const subscription = await this.getSubscriptionById(subscriptionId);
      subscription.status = status;
      const sub = await this.subRepository.save(subscription);
      await this.mailService.subscriptionStatusChange(
        sub.user.email,
        status,
        sub.plan.name,
      );
      return sub;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async cancelSubscription(
    subscriptionId: string,
    reason: string,
  ): Promise<Subscripcion> {
    try {
      const cancellationDate = new Date();
      await this.subRepository.update(subscriptionId, {
        status: SubscriptionStatus.CANCELLED,
        cancellationDate,
        cancellationReason: reason,
      });
      return await this.getSubscriptionById(subscriptionId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // Mercado Pago Subscriptions
  async getMercadoPagoSubscriptions(): Promise<any[]> {
    try {
      return await this.mercadoPagoService.getAllSubscriptions();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getMercadoPagoSubscriptionById(subscriptionId: string): Promise<any> {
    try {
      return await this.mercadoPagoService.getSubscriptionById(subscriptionId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async cancelMercadoPagoSubscription(subscriptionId: string): Promise<any> {
    try {
      return await this.mercadoPagoService.cancelSubscription(subscriptionId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async createDatabaseService(
    subscripcion: Subscripcion,
    dbData: createServiceDto,
  ): Promise<Database> {
    try {
      // Crear la entidad de base de datos
      const database = this.databaseRepository.create({
        subscripcion: subscripcion,
        DB_NAME: dbData.dbName,
        DB_HOST: dbData.dbHost,
        DB_PORT: dbData.dbPort,
        DB_USERNAME: dbData.dbUsername,
        DB_PASSWORD: dbData.dbPassword,
        url: dbData.url,
      });

      // Guardar en la base de datos
      const savedDatabase = await this.databaseRepository.save(database);

      // Enviar correo electrónico de confirmación
      await this.mailService.sendServiceAccessCredentials({
        email: dbData.email,
        username: dbData.username,
        password: dbData.password,
        url: dbData.url,
      });

      return savedDatabase;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
