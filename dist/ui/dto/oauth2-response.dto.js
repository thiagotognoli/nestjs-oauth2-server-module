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
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
/**
 * Main object used to transport data
 */
class OAuth2Response {
    /**
     * Main method used to build this object
     *
     * @param accessToken
     * @param refreshToken
     * @param accessTokenExp
     * @param refreshTokenExp
     * @param scope
     */
    constructor(accessToken, refreshToken, accessTokenExp, refreshTokenExp, scope) {
        this.tokenType = 'bearer';
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExp = accessTokenExp;
        this.refreshTokenExp = refreshTokenExp;
        this.scope = scope;
    }
}
__decorate([
    swagger_1.ApiModelProperty({
        type: String,
        description: 'The generated access token',
        required: true
    }),
    class_transformer_1.Expose({ name: 'access_token' }),
    __metadata("design:type", String)
], OAuth2Response.prototype, "accessToken", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        type: String,
        description: 'The type of token, in our case should always be "bearer"',
        required: true
    }),
    class_transformer_1.Expose({ name: 'token_type' }),
    __metadata("design:type", String)
], OAuth2Response.prototype, "tokenType", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        type: String,
        description: 'The generated refresh token',
        required: true
    }),
    class_transformer_1.Expose({ name: 'refresh_token' }),
    __metadata("design:type", String)
], OAuth2Response.prototype, "refreshToken", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        type: Number,
        description: 'Number of seconds until the acess token expires',
        required: true
    }),
    class_transformer_1.Expose({ name: 'expires_in' }),
    __metadata("design:type", Number)
], OAuth2Response.prototype, "accessTokenExp", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        type: Number,
        description: 'The list of the permissions (tpApps) that the application requests.',
        required: true
    }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Number)
], OAuth2Response.prototype, "refreshTokenExp", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        type: String,
        description: 'Scopes you are allowed to use if any requested',
        required: true
    }),
    class_transformer_1.Expose({ name: 'scope' }),
    __metadata("design:type", String)
], OAuth2Response.prototype, "scope", void 0);
exports.OAuth2Response = OAuth2Response;
//# sourceMappingURL=oauth2-response.dto.js.map