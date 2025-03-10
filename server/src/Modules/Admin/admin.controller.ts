import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ErrorHandler } from 'src/Utils/Error.Handler';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { User } from '../User/User.entity';
import { Plan } from '../User/Planes.entity';
import { Subscripcion, SubscriptionStatus } from '../User/Subscripcion.entity';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto';
import { createServiceDto } from './dto/createService.dto';

@Controller('/admin')
@UseGuards(AuthGuard, AdminGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // =====================
  // Endpoints para USUARIOS
  // =====================

  @Get('/user/:userId')
  @ApiOperation({
    summary: 'Obtener usuario',
    description: 'Obtiene un usuario',
  })
  async getUserById(@Param('userId') userId: string): Promise<User> {
    try {
      return await this.adminService.getUserById(userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/users')
  @ApiOperation({
    summary: 'Obtener usuarios',
    description: 'Obtiene todos los usuarios',
  })
  async getUsers(): Promise<User[]> {
    try {
      return await this.adminService.getUsers();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/getUsersSubscribed')
  @ApiOperation({
    summary: 'Obtener usuarios suscritos',
    description: 'Obtiene todos los usuarios que tienen una suscripción',
  })
  async getUsersSubscribed(): Promise<User[]> {
    try {
      return await this.adminService.getUsersSubscribed();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/getUsersSubscribed/:planId')
  @ApiOperation({
    summary: 'Obtener usuarios suscritos en un plan',
    description:
      'Obtiene todos los usuarios suscritos en el plan seleccionado (por id)',
  })
  async getUsersSubscribedAt(@Param('planId') planId: number): Promise<User[]> {
    try {
      return await this.adminService.getUsersSubscribedAt(planId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/admin/:userId')
  @ApiOperation({
    summary: 'Asignar rol admin',
    description: 'Asigna el rol de administrador a un usuario',
  })
  async putAdmin(@Param('userId') userId: string): Promise<User> {
    try {
      return await this.adminService.putAdmin(userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/verifyEmail/:userId')
  @ApiOperation({
    summary: 'verifica el mail',
  })
  async verifyEmail(@Param('userId') userId: string): Promise<User> {
    try {
      return await this.adminService.verifyEmail(userId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // =====================
  // Endpoints para PLANES
  // =====================

  @Get('/plans')
  @ApiOperation({
    summary: 'Obtener planes',
    description: 'Obtiene todos los planes disponibles',
  })
  async getAllPlans(): Promise<Plan[]> {
    try {
      return await this.adminService.getAllPlans();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Post('/plan')
  @ApiOperation({
    summary: 'Crear plan',
    description: 'Crea un nuevo plan',
  })
  async createPlan(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
    try {
      return await this.adminService.createPlan(createPlanDto);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/plan/:planId')
  @ApiOperation({
    summary: 'Actualizar plan',
    description: 'Actualiza los datos de un plan existente',
  })
  async updatePlan(
    @Param('planId') planId: number,
    @Body() updatePlanDto: UpdatePlanDto,
  ): Promise<Plan> {
    try {
      return await this.adminService.updatePlan(planId, updatePlanDto);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Delete('/plan/:planId')
  @ApiOperation({
    summary: 'Eliminar plan',
    description: 'Elimina un plan existente',
  })
  async deletePlan(@Param('planId') planId: number): Promise<void> {
    try {
      await this.adminService.deletePlan(planId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // =====================
  // Endpoints para SUSCRIPCIONES
  // =====================

  @Get('/subscriptions')
  @ApiOperation({
    summary: 'Obtener suscripciones',
    description: 'Obtiene todas las suscripciones',
  })
  async getAllSubscriptions(): Promise<Subscripcion[]> {
    try {
      return await this.adminService.getAllSubscriptions();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/subscription/:subscriptionId')
  @ApiOperation({
    summary: 'Obtener suscripción',
    description: 'Obtiene una suscripción por su id',
  })
  async getSubscriptionById(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<Subscripcion> {
    try {
      return await this.adminService.getSubscriptionById(subscriptionId);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/subscription/:subscriptionId/status')
  @ApiOperation({
    summary: 'Actualizar estado de suscripción',
    description: 'Actualiza el estado de una suscripción',
  })
  async updateSubscriptionStatus(
    @Param('subscriptionId') subscriptionId: string,
    @Body('status') status: SubscriptionStatus,
  ): Promise<Subscripcion> {
    try {
      return await this.adminService.updateSubscriptionStatus(
        subscriptionId,
        status,
      );
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/subscription/:subscriptionId/cancel')
  @ApiOperation({
    summary: 'Cancelar suscripción',
    description: 'Cancela una suscripción proporcionando un motivo',
  })
  async cancelSubscription(
    @Param('subscriptionId') subscriptionId: string,
    @Body('reason') reason: string,
  ): Promise<Subscripcion> {
    try {
      return await this.adminService.cancelSubscription(subscriptionId, reason);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // =====================
  // Endpoints para SUSCRIPCIONES DE MERCADO PAGO
  // =====================

  @Get('/mp/subscriptions')
  @ApiOperation({
    summary: 'Obtener suscripciones de Mercado Pago',
    description: 'Obtiene todas las suscripciones de Mercado Pago',
  })
  async getMercadoPagoSubscriptions(): Promise<any[]> {
    try {
      return await this.adminService.getMercadoPagoSubscriptions();
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Get('/mp/subscription/:subscriptionId')
  @ApiOperation({
    summary: 'Obtener suscripción de Mercado Pago',
    description: 'Obtiene una suscripción de Mercado Pago por su ID',
  })
  async getMercadoPagoSubscriptionById(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<any> {
    try {
      return await this.adminService.getMercadoPagoSubscriptionById(
        subscriptionId,
      );
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  @Put('/mp/subscription/:subscriptionId/cancel')
  @ApiOperation({
    summary: 'Cancelar suscripción de Mercado Pago',
    description: 'Cancela una suscripción de Mercado Pago por su ID',
  })
  async cancelMercadoPagoSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<any> {
    try {
      return await this.adminService.cancelMercadoPagoSubscription(
        subscriptionId,
      );
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }

  // =====================
  // Endpoints para DATABASE
  // =====================

  @Post('/create-service/:subId')
  async createService(
    @Body() createServiceDto: createServiceDto,
    @Param('subId') subscriptionId: string,
  ) {
    const subscription =
      await this.adminService.getSubscriptionById(subscriptionId);

    const databaseService = await this.adminService.createDatabaseService(
      subscription,
      createServiceDto,
    );

    return {
      message: 'Servicio creado exitosamente',
      serviceId: databaseService.id,
    };
  }
}
