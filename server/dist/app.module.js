"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("./config/typeorm");
const jwt_1 = require("@nestjs/jwt");
const User_entity_1 = require("./Modules/User/User.entity");
const users_module_1 = require("./Modules/User/users.module");
const preLoad_module_1 = require("./Modules/preLoad/preLoad.module");
const suscriber_module_1 = require("./Modules/Suscribe/suscriber.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            users_module_1.UserModule,
            suscriber_module_1.SuscribeModule,
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1000h' },
                secret: process.env.JWT_SECRET,
            }),
            typeorm_1.TypeOrmModule.forFeature([User_entity_1.User]),
        ],
        controllers: [],
        providers: [preLoad_module_1.PreLoadModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map