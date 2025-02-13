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
exports.UsersPreLoad = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Planes_entity_1 = require("../User/Planes.entity");
const User_entity_1 = require("../User/User.entity");
const Error_Handler_1 = require("../../Utils/Error.Handler");
const bcrypt = require("bcrypt");
const Planes_entity_2 = require("../User/Planes.entity");
let UsersPreLoad = class UsersPreLoad {
    constructor(userRepository, planRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.users = [
            {
                email: 'romer@gmail.com',
                company: 'Assetly',
                password: 'Paria!481632',
                telefono: '+54351532645',
                username: 'Romer',
            },
        ];
        this.planes = [
            {
                imagen: 'WorkflowImg01',
                name: 'Free Pass',
                alt: 'Workflow 01',
                precio: 0,
                activos: '300',
                descripcion: 'Podrá tener todas las funcionalidades del servicio, a excepción de las personalizaciones.',
            },
            {
                imagen: 'WorkflowImg02',
                name: 'AssetsOK',
                alt: 'WorkflowImg02',
                precio: 80,
                activos: '500',
                descripcion: 'En este plan podrá tener todas las funcionalidades, además de personalizaciones en Reportes.',
            },
            {
                imagen: 'WorkflowImg03',
                name: 'UltraAssets',
                alt: 'WorkflowImg03',
                precio: 200,
                activos: '2500',
                descripcion: 'Tendrá todas las funcionalidades, y personalizaciones deseadas.',
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
    }
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
                }
                else {
                    console.log(`El usuario con correo ${userData.email} ya existe`);
                }
            }
            console.log('Usuarios cargados con éxito');
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async preLoadPlans() {
        try {
            for (const planData of this.planes) {
                const existingPlan = await this.planRepository.findOne({
                    where: { name: planData.name },
                });
                if (!existingPlan) {
                    let processedPrecio;
                    if (typeof planData.precio === 'string') {
                        if (planData.precio.toLowerCase() === 'free') {
                            processedPrecio = 0;
                        }
                        else {
                            const numericString = planData.precio.replace(/[^0-9.]/g, '');
                            processedPrecio = parseFloat(numericString);
                        }
                    }
                    else {
                        processedPrecio = planData.precio;
                    }
                    const plan = this.planRepository.create({
                        name: planData.name,
                        descripcion: planData.descripcion,
                        imagen: planData.imagen,
                        alt: planData.alt,
                        precio: Number(processedPrecio.toFixed(2)),
                        activos: planData.activos,
                        popular: planData.popular || false,
                        mercadopagoPlanId: `mp_${planData.name.toLowerCase().replace(/\s+/g, '_')}`,
                        billingCycle: Planes_entity_2.BillingCycle.MONTHLY,
                        activo: true,
                    });
                    await this.planRepository.save(plan);
                }
                else {
                    console.log(`El plan con nombre ${planData.name} ya existe`);
                }
            }
            console.log('Planes cargados con éxito');
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
};
exports.UsersPreLoad = UsersPreLoad;
exports.UsersPreLoad = UsersPreLoad = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Planes_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersPreLoad);
//# sourceMappingURL=preLoad.user.service.js.map