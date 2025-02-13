"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuscribeModule = void 0;
const mercadopago_1 = require("mercadopago");
const Subscripcion_entity_1 = require("../User/Subscripcion.entity");
const Planes_entity_1 = require("../User/Planes.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const suscriber_controller_1 = require("./suscriber.controller");
const suscriber_service_1 = require("./suscriber.service");
let SuscribeModule = class SuscribeModule {
};
exports.SuscribeModule = SuscribeModule;
exports.SuscribeModule = SuscribeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mercadopago_1.User, Subscripcion_entity_1.Subscripcion, Planes_entity_1.Plan])],
        providers: [suscriber_service_1.SubscriptionsService],
        controllers: [suscriber_controller_1.SubscriptionsController],
    })
], SuscribeModule);
//# sourceMappingURL=suscriber.module.js.map