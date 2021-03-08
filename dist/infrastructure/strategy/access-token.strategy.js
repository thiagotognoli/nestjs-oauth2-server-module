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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenStrategy = void 0;
const passport_http_bearer_1 = require("passport-http-bearer");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const interface_1 = require("../../domain/interface");
let AccessTokenStrategy = class AccessTokenStrategy extends passport_1.PassportStrategy(passport_http_bearer_1.Strategy, 'access-token') {
    constructor(accessTokenRepository, userLoader) {
        super();
        this.accessTokenRepository = accessTokenRepository;
        this.userLoader = userLoader;
    }
    /**
     * Validate the bearer (accessToken) using the HTTP Bearer Header strategy
     *
     * @param bearer
     */
    validate(bearer) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.accessTokenRepository.findByAccessToken(bearer);
            if (!accessToken || accessToken.accessTokenExpiresAt < new Date(Date.now())) {
                throw new common_1.UnauthorizedException();
            }
            if (accessToken.userId) {
                const user = yield this.userLoader.load(accessToken.userId);
                return new interface_1.UserPayload(accessToken, accessToken.userId, user.username, user.email);
            }
            return new interface_1.ClientPayload(accessToken, accessToken.client.id, accessToken.client.clientId, accessToken.client.name);
        });
    }
};
AccessTokenStrategy = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('AccessTokenRepositoryInterface')),
    __param(1, common_1.Inject('UserLoaderInterface')),
    __metadata("design:paramtypes", [Object, Object])
], AccessTokenStrategy);
exports.AccessTokenStrategy = AccessTokenStrategy;
//# sourceMappingURL=access-token.strategy.js.map