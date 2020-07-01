import { DynamicModule, OnModuleInit } from "@nestjs/common";
import { Oauth2GrantStrategyRegistry, StrategyExplorer } from "../domain";
import { Oauth2AsyncOptionsInterface, OAuth2Options } from "./interfaces";
import { CreateAccessTokenHandler, CreateClientHandler } from "./command";
import { AccessTokenRepository, ClientRepository } from "../infrastructure/typeorm";
import { ClientCredentialsStrategy, PasswordStrategy, RefreshTokenStrategy } from "../infrastructure/oauth2-grant-strategy";
export declare const CommandHandlers: (typeof CreateAccessTokenHandler | typeof CreateClientHandler)[];
export declare const EventHandlers: any[];
export declare const QueryHandlers: any[];
export declare const Sagas: any[];
export declare const Services: ({
    provide: string;
    useClass: typeof ClientRepository;
} | {
    provide: string;
    useClass: typeof AccessTokenRepository;
})[];
export declare const ServiceNames: string[];
export declare const Resolvers: any[];
export declare const Oauth2Strategies: (typeof ClientCredentialsStrategy | typeof RefreshTokenStrategy | typeof PasswordStrategy)[];
export declare const Providers: (typeof StrategyExplorer | typeof Oauth2GrantStrategyRegistry)[];
export declare class Oauth2CoreModule implements OnModuleInit {
    private readonly options;
    private readonly explorerService;
    private readonly strategyRegistry;
    constructor(options: OAuth2Options, explorerService: StrategyExplorer, strategyRegistry: Oauth2GrantStrategyRegistry);
    /**
     * Create the static for Root Options
     *
     * @param options
     */
    static forRoot(options: OAuth2Options): DynamicModule;
    static forRootAsync(options: Oauth2AsyncOptionsInterface): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    onModuleInit(): void;
}
