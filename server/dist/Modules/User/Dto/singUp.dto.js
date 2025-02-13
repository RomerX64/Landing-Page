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
Object.defineProperty(exports, "__esModule", { value: true });
exports.singUp = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class singUp {
}
exports.singUp = singUp;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un mail válido',
        example: 'example@gmail.com',
    }),
    __metadata("design:type", String)
], singUp.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'El nombre de la empresa',
        example: 'Compañados Total',
    }),
    __metadata("design:type", String)
], singUp.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string mayor de 5 caracteres y cumplir con reglas de seguridad',
        example: 'Admin123!',
    }),
    __metadata("design:type", String)
], singUp.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'DEBE ser un STRING, Debe ser un número de teléfono válido',
        example: '+54351532645',
    }),
    __metadata("design:type", String)
], singUp.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string mayor de 5 caracteres',
        example: 'Romer',
    }),
    __metadata("design:type", String)
], singUp.prototype, "username", void 0);
//# sourceMappingURL=singUp.dto.js.map