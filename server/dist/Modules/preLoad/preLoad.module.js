"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreLoadModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const preLoad_user_service_1 = require("./preLoad.user.service");
const Planes_entity_1 = require("../User/Planes.entity");
const users_module_1 = require("../User/users.module");
const User_entity_1 = require("../User/User.entity");
let PreLoadModule = class PreLoadModule {
};
exports.PreLoadModule = PreLoadModule;
exports.PreLoadModule = PreLoadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([Planes_entity_1.Plan, User_entity_1.User]),
        ],
        providers: [preLoad_user_service_1.UsersPreLoad],
    })
], PreLoadModule);
//# sourceMappingURL=preLoad.module.js.map