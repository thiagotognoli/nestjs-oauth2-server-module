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
exports.OAuth2Request = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
/**
 * Main object used to transport data
 */
//@UsePipes(new ValidationPipe({ transform: true }))
class OAuth2Request {
}
__decorate([
    swagger_1.ApiProperty({
        name: 'grant_type',
        type: String,
        description: 'The type of grant you are requesting, must be "client_credentials"',
        required: true
    }),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Expose({ name: "grant_type" }),
    __metadata("design:type", String)
], OAuth2Request.prototype, "grantType", void 0);
__decorate([
    swagger_1.ApiProperty({
        name: 'client_id',
        type: String,
        description: 'The API Key given by the application',
        required: true
    }),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Expose({ name: "client_id" }),
    __metadata("design:type", String)
], OAuth2Request.prototype, "clientId", void 0);
__decorate([
    swagger_1.ApiProperty({
        name: 'client_secret',
        type: String,
        description: 'The API Token given by the application',
        required: false
    }),
    class_transformer_1.Expose({ name: "client_secret" }),
    __metadata("design:type", String)
], OAuth2Request.prototype, "clientSecret", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        description: 'The expiration time of the assertion, specified as seconds since 00:00:00 UTC, January 1, 1970. This value has a maximum of 1 hour after the issued time.',
        required: false
    }),
    class_transformer_1.Expose({ name: "exp" }),
    __metadata("design:type", Number)
], OAuth2Request.prototype, "exp", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        description: 'The time the assertion was issued, specified as seconds since 00:00:00 UTC, January 1, 1970.',
        required: false
    }),
    class_transformer_1.Expose({ name: "iat" }),
    __metadata("design:type", Number)
], OAuth2Request.prototype, "iat", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'The list of the permissions (tpApps) that the application requests.',
        isArray: true
    }),
    class_transformer_1.Expose({ name: "scopes" }),
    __metadata("design:type", Object)
], OAuth2Request.prototype, "scopes", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'The refresh token only when grant_type is set to "refresh_token"',
        required: false
    }),
    class_transformer_1.Expose({ name: "refresh_token" }),
    __metadata("design:type", String)
], OAuth2Request.prototype, "refreshToken", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'The username only when grant_type is set to "refresh_token"',
    }),
    class_transformer_1.Expose({ name: "username" }),
    __metadata("design:type", String)
], OAuth2Request.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        description: 'The password when grant_type is set to "password_grant"',
    }),
    class_transformer_1.Expose({ name: "password" }),
    __metadata("design:type", String)
], OAuth2Request.prototype, "password", void 0);
exports.OAuth2Request = OAuth2Request;
//# sourceMappingURL=oauth2-request.dto.js.map