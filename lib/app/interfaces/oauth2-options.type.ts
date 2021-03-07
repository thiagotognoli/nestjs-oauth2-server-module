import {UserLoaderInterface, UserValidatorInterface} from "../../domain/interface";

export type OAuth2Options = {
    useTypeOrmConnection?: string,
    userLoader: UserLoaderInterface,
    userValidator: UserValidatorInterface,
};
