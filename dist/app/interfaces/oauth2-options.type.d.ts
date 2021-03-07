import { UserLoaderInterface, UserValidatorInterface } from "../../domain/interface";
export declare type OAuth2Options = {
    useTypeOrmConnection?: string;
    userLoader: UserLoaderInterface;
    userValidator: UserValidatorInterface;
};
