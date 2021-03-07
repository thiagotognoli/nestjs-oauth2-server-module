import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Oauth2OptionsFactoryInterface } from "./oauth2-options-factory.interface";
import { OAuth2Options } from "./oauth2-options.type";
export interface Oauth2AsyncOptionsInterface extends Pick<ModuleMetadata, 'imports'> {
    useTypeOrmConnection?: string;
    useExisting?: Type<Oauth2OptionsFactoryInterface>;
    useClass?: Type<Oauth2OptionsFactoryInterface>;
    useFactory?: (...args: any[]) => Promise<OAuth2Options> | OAuth2Options;
    inject?: any[];
}
