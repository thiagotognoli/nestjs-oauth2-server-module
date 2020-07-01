/**
 * Main object used to transport data
 */
export declare class OAuth2Request {
    grantType: string;
    clientId: string;
    clientSecret: string;
    exp?: number;
    iat?: number;
    scopes?: string | string[];
    refreshToken?: string;
    username?: string;
    password?: string;
}
