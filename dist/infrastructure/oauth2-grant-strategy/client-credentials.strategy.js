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
exports.ClientCredentialsStrategy = void 0;
const strategy_1 = require("../../domain/strategy");
const dto_1 = require("../../ui/dto");
const common_1 = require("@nestjs/common");
const command_1 = require("../../app/command");
const cqrs_1 = require("@nestjs/cqrs");
let ClientCredentialsStrategy = class ClientCredentialsStrategy {
    /**
     * Constructor
     *
     * @param clientRepository
     * @param commandBus
     */
    constructor(clientRepository, commandBus) {
        this.clientRepository = clientRepository;
        this.commandBus = commandBus;
    }
    validate(request, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client.clientSecret !== request.clientSecret || !request.clientSecret || client.deletedAt !== null || !client.grants.includes(request.grantType)) {
                return false;
            }
            const scopes = JSON.parse(client.scope);
            const requestScopes = typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
            return requestScopes.every((scope) => (scopes.includes(scope)));
        });
    }
    getOauth2Response(request, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestScopes = typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
            const accessToken = yield this.commandBus.execute(new command_1.CreateAccessTokenCommand(client.id, JSON.stringify(requestScopes), request.exp, request.iat, request));
            return new dto_1.OAuth2Response(accessToken.accessToken, accessToken.refreshToken, ~~((accessToken.accessTokenExpiresAt.getTime() - Date.now()) / 1000), ~~((accessToken.refreshTokenExpiresAt.getTime() - Date.now()) / 1000));
        });
    }
};
ClientCredentialsStrategy = __decorate([
    strategy_1.Oauth2GrantStrategy('client_credentials'),
    __param(0, common_1.Inject('ClientRepositoryInterface')),
    __metadata("design:paramtypes", [Object, cqrs_1.CommandBus])
], ClientCredentialsStrategy);
exports.ClientCredentialsStrategy = ClientCredentialsStrategy;
//# sourceMappingURL=client-credentials.strategy.js.map