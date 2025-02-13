"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mercadopago_1 = require("mercadopago");
const Subscripcion_entity_1 = require("../User/Subscripcion.entity");
const Planes_entity_1 = require("../User/Planes.entity");
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_PUBLIC_KEY,
});
let SubscriptionsService = class SubscriptionsService {
    constructor(subscriptionRepository, planRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
    }
    async createSubscription(dto) {
        const plan = await this.planRepository.findOne({
            where: { id: dto.planId },
        });
        if (!plan) {
            throw new common_1.HttpException('Plan no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        if (!dto.userEmail || !dto.paymentMethodToken) {
            throw new common_1.HttpException('Datos incompletos para la suscripción', common_1.HttpStatus.BAD_REQUEST);
        }
        console.log('Plan encontrado:', plan);
        const preApproval = new mercadopago_1.PreApproval(client);
        console.log('PreApproval creado:', preApproval);
        try {
            const response = await preApproval.create({
                body: {
                    payer_email: dto.userEmail,
                    card_token_id: dto.paymentMethodToken,
                    status: 'authorized',
                    auto_recurring: {
                        frequency: 1,
                        frequency_type: 'months',
                        transaction_amount: plan.precio,
                        currency_id: 'ARS',
                    },
                },
            });
            console.log('Respuesta de Mercado Pago:', response);
            if (!response || !response.id) {
                throw new common_1.HttpException('No se recibió ID de suscripción de Mercado Pago', common_1.HttpStatus.BAD_REQUEST);
            }
            const newSubscription = this.subscriptionRepository.create({
                plan,
                fechaInicio: new Date(),
                mercadopagoSubscriptionId: response.id,
                status: Subscripcion_entity_1.SubscriptionStatus.ACTIVE,
            });
            console.log('Nueva suscripción creada:', newSubscription);
            await this.subscriptionRepository.save(newSubscription);
            return {
                message: 'Suscripción creada correctamente',
                subscription: newSubscription,
            };
        }
        catch (error) {
            console.error('Error al crear la suscripción en Mercado Pago:', error.message || error.response?.data);
            if (error.response?.data) {
                throw new common_1.HttpException(`Error al crear la suscripción en Mercado Pago: ${error.response.data.message}`, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Error inesperado al crear la suscripción', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async cancelSubscription(dto) {
        const subscription = await this.subscriptionRepository.findOne({
            where: { mercadopagoSubscriptionId: dto.subscriptionId },
        });
        if (!subscription) {
            throw new common_1.HttpException('Suscripción no encontrada', common_1.HttpStatus.NOT_FOUND);
        }
        const preApproval = new mercadopago_1.PreApproval(client);
        try {
            await preApproval.update({
                id: dto.subscriptionId,
                body: { status: 'cancelled' },
            });
            subscription.status = Subscripcion_entity_1.SubscriptionStatus.CANCELLED;
            subscription.cancellationDate = new Date();
            subscription.cancellationReason = dto.cancellationReason;
            await this.subscriptionRepository.save(subscription);
            return {
                message: 'Suscripción cancelada correctamente',
                subscription,
            };
        }
        catch (error) {
            console.error('Error al cancelar la suscripción en Mercado Pago:', error.message || error.response?.data);
            throw new common_1.HttpException('Error al cancelar la suscripción', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async handleWebhook(notification) {
        const { id, action } = notification;
        const subscription = await this.subscriptionRepository.findOne({
            where: { mercadopagoSubscriptionId: id },
        });
        if (!subscription) {
            throw new common_1.HttpException('Suscripción no encontrada para el webhook', common_1.HttpStatus.NOT_FOUND);
        }
        if (action === 'payment_approved') {
            subscription.fechaUltimaPaga = new Date();
            subscription.fechaVencimiento = this.calculateExpiryDate(new Date(), subscription.plan.billingCycle);
            subscription.status = Subscripcion_entity_1.SubscriptionStatus.ACTIVE;
        }
        else if (action === 'payment_failed') {
            subscription.status = Subscripcion_entity_1.SubscriptionStatus.PAUSED;
        }
        else if (action === 'subscription_cancelled') {
            subscription.status = Subscripcion_entity_1.SubscriptionStatus.CANCELLED;
            subscription.cancellationDate = new Date();
            subscription.cancellationReason =
                notification.reason || 'No especificado';
        }
        await this.subscriptionRepository.save(subscription);
    }
    calculateExpiryDate(startDate, billingCycle) {
        const expiryDate = new Date(startDate);
        if (billingCycle === 'monthly') {
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }
        else if (billingCycle === 'yearly') {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        }
        return expiryDate;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Subscripcion_entity_1.Subscripcion)),
    __param(1, (0, typeorm_1.InjectRepository)(Planes_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionsService);
//# sourceMappingURL=suscriber.service.js.map