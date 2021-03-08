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
exports.CreateAccessTokenHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const create_access_token_command_1 = require("./create-access-token.command");
const domain_1 = require("../../domain");
const crypto = require("crypto");
const event_1 = require("../event");
let CreateAccessTokenHandler = class CreateAccessTokenHandler {
    constructor(accessTokenRepository, clientRepository, eventBus) {
        this.accessTokenRepository = accessTokenRepository;
        this.clientRepository = clientRepository;
        this.eventBus = eventBus;
    }
    /**
     * Execute the create AccessToken Command
     *
     * @param command
     */
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.clientRepository.find(command.clientId);
            // @fixme: Shall we remove old tokens ?
            const accessToken = new domain_1.AccessTokenEntity();
            accessToken.client = client;
            accessToken.createdAt = new Date();
            accessToken.createdFrom = command.request;
            accessToken.scope = command.scope;
            // generate access & refresh tokens
            const now = Date.now();
            // Ensure we have an expiration
            const requestedExp = command.exp || (new Date(now + client.accessTokenLifetime * 1000)).getTime() / 1000;
            const exp = (now + client.accessTokenLifetime * 1000 < requestedExp * 1000) ?
                (now + client.accessTokenLifetime * 1000) : (requestedExp * 1000);
            accessToken.refreshTokenExpiresAt = new Date(now + client.refreshTokenLifetime * 1000);
            accessToken.accessTokenExpiresAt = new Date(exp);
            accessToken.refreshToken = crypto.randomBytes(32).toString('hex');
            accessToken.accessToken = crypto.randomBytes(32).toString('hex');
            if (command.userId) {
                accessToken.userId = command.userId;
            }
            const token = yield this.accessTokenRepository.create(accessToken);
            // emit an access token created event
            this.eventBus.publish(new event_1.AccessTokenCreatedEvent(token.id, command.clientId, token.accessToken, token.accessTokenExpiresAt, token.refreshToken, token.refreshTokenExpiresAt, token.scope, command.userId));
            return token;
        });
    }
};
CreateAccessTokenHandler = __decorate([
    cqrs_1.CommandHandler(create_access_token_command_1.CreateAccessTokenCommand),
    __param(0, common_1.Inject('AccessTokenRepositoryInterface')),
    __param(1, common_1.Inject('ClientRepositoryInterface')),
    __metadata("design:paramtypes", [Object, Object, cqrs_1.EventBus])
], CreateAccessTokenHandler);
exports.CreateAccessTokenHandler = CreateAccessTokenHandler;
//# sourceMappingURL=create-access-token.handler.js.map