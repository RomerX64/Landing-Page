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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const singIn_dto_1 = require("./Dto/singIn.dto");
const singUp_dto_1 = require("./Dto/singUp.dto");
const Error_Handler_1 = require("../../Utils/Error.Handler");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const admin_guard_1 = require("../../guards/admin.guard");
const updateUser_dto_1 = require("./Dto/updateUser.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async singIn(singIn) {
        try {
            return await this.userService.singIn(singIn);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async mailIsValid(email) {
        try {
            return await this.userService.mailIsValid(email);
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async singUp(signUp) {
        try {
            return await this.userService.signUp(signUp);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getUsers() {
        try {
            return await this.userService.getUsers();
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getUsersSubscribed() {
        try {
            return await this.userService.getUsersSubscribed();
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getUsersSubscribedAt(planId) {
        try {
            return await this.userService.getUsersSubscribedAt(planId);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async suscribeUser(userId, planId) {
        try {
            return await this.userService.suscribeUser(userId, planId);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async desuscribeUser(userId) {
        try {
            return await this.userService.desuscribeUser(userId);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async deleteUser(body) {
        try {
            const { username, password } = body;
            return await this.userService.deleteUser(username, password);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getPlan(planId) {
        try {
            return await this.userService.getPlan(planId);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async getPlanes() {
        try {
            return await this.userService.getPlanes();
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
    async updateUser(updateUser) {
        try {
            return await this.userService.updateUser(updateUser);
        }
        catch (error) {
            throw Error_Handler_1.ErrorHandler.handle(error);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/singIn'),
    (0, swagger_1.ApiOperation)({
        summary: 'Logearse',
        description: 'Logea al usuario mediante el username y password.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [singIn_dto_1.singIn]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "singIn", null);
__decorate([
    (0, common_1.Get)('/email/:email'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar email',
        description: 'Verifica si el email es válido y no está en uso',
    }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "mailIsValid", null);
__decorate([
    (0, common_1.Post)('/singUp'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar usuario',
        description: 'Registra a un usuario nuevo y envía un email de confirmación',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [singUp_dto_1.singUp]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "singUp", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/users'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener usuarios',
        description: 'Obtiene todos los usuarios',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/getUsersSubscribed'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener usuarios suscritos',
        description: 'Obtiene todos los usuarios suscritos',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersSubscribed", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/getUsersSubscribed/:planId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener usuarios suscritos en un plan',
        description: 'Obtiene todos los usuarios suscritos en el plan seleccionado',
    }),
    __param(0, (0, common_1.Param)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersSubscribedAt", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/suscribe/:userId/:planId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Suscribir usuario',
        description: 'Suscribe al usuario a un plan mediante su userId y plan de pago',
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "suscribeUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/desuscribe/:userId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Desuscribir usuario',
        description: 'Desuscribe a un usuario mediante su userId',
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "desuscribeUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('/user'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar usuario',
        description: 'Elimina un usuario mediante el username y password',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('plan/:planId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener un plan',
        description: 'Obtiene los datos de un solo plan',
    }),
    __param(0, (0, common_1.Param)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPlan", null);
__decorate([
    (0, common_1.Get)('planes'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener planes',
        description: 'Obtiene los datos de los planes',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPlanes", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar usuario',
        description: 'Actualiza los datos de un usuario',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.updateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map