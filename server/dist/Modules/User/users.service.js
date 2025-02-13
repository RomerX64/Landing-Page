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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("./User.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const Error_Handler_1 = require("../../Utils/Error.Handler");
const jwt_1 = require("@nestjs/jwt");
const Subscripcion_entity_1 = require("./Subscripcion.entity");
const Planes_entity_1 = require("./Planes.entity");
let UserService = class UserService {
    constructor(userRepository, planRepository, subsRepository, jwtService) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.subsRepository = subsRepository;
        this.jwtService = jwtService;
    }
    async getUserById(userId) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user)
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            return user;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async singIn(singIn) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: singIn.email },
            });
            if (!user)
                throw new common_1.HttpException('Credencial inválida', common_1.HttpStatus.BAD_REQUEST);
            const isValid = await bcrypt.compare(singIn.password, user.password);
            if (!isValid)
                throw new common_1.HttpException('Credencial inválida', common_1.HttpStatus.BAD_REQUEST);
            const userPayload = {
                sub: user.id,
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            const token = this.jwtService.sign(userPayload);
            return { User: user, token: token };
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async signUp(signUp) {
        try {
            const exist = await this.userRepository.findOne({
                where: { email: signUp.email },
            });
            if (exist) {
                throw new common_1.HttpException('El email ya está registrado', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await bcrypt.hash(signUp.password, 10);
            const user = this.userRepository.create({
                ...signUp,
                password: hashedPassword,
                emailVerified: false,
            });
            const savedUser = await this.userRepository.save(user);
            const emailToken = this.jwtService.sign({ email: savedUser.email }, { expiresIn: '1d' });
            const userPayload = {
                sub: savedUser.id,
                id: savedUser.id,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin,
            };
            const token = this.jwtService.sign(userPayload);
            return { user: savedUser, token: token };
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async updateUser(updateUser) {
        try {
            if (updateUser.password)
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
            const userPayload = {
                sub: updateUser.id,
                id: updateUser.id,
                email: updateUser.email,
                isAdmin: false,
            };
            const token = this.jwtService.sign(userPayload);
            const user = await this.userRepository.save(updateUser);
            return { user: user, token: token };
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getUsers() {
        try {
            const users = await this.userRepository.find();
            return users;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getUsersSubscribed() {
        try {
            const users = await this.userRepository.find({
                where: { subscripcion: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
            });
            return users;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getUsersSubscribedAt(planId) {
        try {
            const users = await this.userRepository.find({
                where: { subscripcion: { plan: { id: planId } } },
            });
            return users;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async suscribeUser(userId, planId) {
        try {
            const user = await this.getUserById(userId);
            const plan = await this.planRepository.findOne({
                where: { id: planId },
            });
            if (!plan) {
                throw new common_1.HttpException('Plan not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const subscripcion = await this.subsRepository.findOne({
                where: { id: user.subscripcion?.id },
            });
            if (!subscripcion) {
                const newSub = this.subsRepository.create({
                    user: user,
                    plan: plan,
                    fechaInicio: new Date(),
                });
                await this.subsRepository.save(newSub);
                user.subscripcion = newSub;
                return user;
            }
            if (subscripcion.plan.id === plan.id) {
                throw new common_1.HttpException('Already subscribed to this plan', common_1.HttpStatus.BAD_REQUEST);
            }
            subscripcion.plan = plan;
            subscripcion.fechaInicio = new Date();
            await this.subsRepository.save(subscripcion);
            return user;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async desuscribeUser(userId) {
        try {
            const user = await this.getUserById(userId);
            if (!user.subscripcion) {
                throw new common_1.HttpException('User is not subscribed to any plan', common_1.HttpStatus.BAD_REQUEST);
            }
            await this.subsRepository.delete(user.subscripcion.id);
            user.subscripcion = null;
            return user;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async deleteUser(username, password) {
        try {
            const user = await this.userRepository.findOne({
                where: { username: username },
            });
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid)
                throw new common_1.HttpException('Credencial inválida', common_1.HttpStatus.BAD_REQUEST);
            await this.userRepository.delete(user);
            return user;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async mailIsValid(email) {
        try {
            const exist = await this.userRepository.findOne({
                where: { email: email },
            });
            return !!exist;
        }
        catch (error) {
            console.error('Error al verificar el email:', error);
            return false;
        }
    }
    async getPlan(planId) {
        try {
            const plan = await this.planRepository.findOne({
                where: { id: planId },
            });
            if (!plan)
                throw new common_1.NotFoundException('Plan not Found');
            return plan;
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getPlanes() {
        try {
            return await this.planRepository.find();
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Planes_entity_1.Plan)),
    __param(2, (0, typeorm_1.InjectRepository)(Subscripcion_entity_1.Subscripcion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=users.service.js.map