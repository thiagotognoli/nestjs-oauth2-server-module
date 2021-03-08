import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {Expose} from "class-transformer";
import { UsePipes, ValidationPipe } from "@nestjs/common";

/**
 * Main object used to transport data
 */
//@UsePipes(new ValidationPipe({ transform: true }))
export class OAuth2Request {
    @ApiProperty({
        name: 'grant_type',
        type:String,
        description: 'The type of grant you are requesting, must be "client_credentials"',
        required: true
    })
    @IsNotEmpty()
    @Expose({ name: "grant_type" })
    grantType: string;

    @ApiProperty({
        name: 'client_id',
        type:String,
        description: 'The API Key given by the application',
        required: true
    })
    @IsNotEmpty()
    @Expose({ name: "client_id" })
    clientId: string;

    @ApiProperty({
        name: 'client_secret',
        type:String,
        description: 'The API Token given by the application',
        required: false
    })
    @Expose({ name: "client_secret" })
    clientSecret: string;

    @ApiProperty({
        type: Number,
        description: 'The expiration time of the assertion, specified as seconds since 00:00:00 UTC, January 1, 1970. This value has a maximum of 1 hour after the issued time.',
        required: false
    })
    @Expose({ name: "exp" })
    exp?: number;

    @ApiProperty({
        type: Number,
        description: 'The time the assertion was issued, specified as seconds since 00:00:00 UTC, January 1, 1970.',
        required: false
    })
    @Expose({ name: "iat" })
    iat?: number;

    @ApiProperty({
        type: String,
        description: 'The list of the permissions (tpApps) that the application requests.',
        isArray: true
    })
    @Expose({ name: "scopes"})
    scopes?: string | string[];

    @ApiProperty({
        type: String,
        description: 'The refresh token only when grant_type is set to "refresh_token"',
        required: false
    })
    @Expose({ name: "refresh_token"})
    refreshToken?: string;

    @ApiProperty({
        type: String,
        description: 'The username only when grant_type is set to "refresh_token"',
    })
    @Expose({ name: "username"})
    username?: string;

    @ApiProperty({
        type: String,
        description: 'The password when grant_type is set to "password_grant"',
    })
    @Expose({ name: "password"})
    password?: string;
}
