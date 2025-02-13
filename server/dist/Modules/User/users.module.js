"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("./User.entity");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const Subscripcion_entity_1 = require("./Subscripcion.entity");
const Planes_entity_1 = require("./Planes.entity");
const preLoad_module_1 = require("../preLoad/preLoad.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => preLoad_module_1.PreLoadModule),
            typeorm_1.TypeOrmModule.forFeature([User_entity_1.User, Subscripcion_entity_1.Subscripcion, Planes_entity_1.Plan]),
        ],
        providers: [users_service_1.UserService],
        controllers: [users_controller_1.UserController],
        exports: [users_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=users.module.js.map