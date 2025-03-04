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
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { updateUserDto } from '../User/Dto/updateUser.dto';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscripcion)
    private readonly subRepository: Repository<Subscripcion>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => SubscriptionsService))
    private readonly subService: SubscriptionsService,
  ) {}

  // Usuarios
  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: ['subscripcion', 'subscripcion.plan'],
      });
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['subscripcion', 'subscripcion.plan'],
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
      // Se puede obtener el usuario, actualizar sus propiedades y luego guardar
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

  // Suscripciones
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
        relations: ['user', 'plan'],
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
      await this.subRepository.update(subscriptionId, { status });
      return await this.getSubscriptionById(subscriptionId);
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
}
