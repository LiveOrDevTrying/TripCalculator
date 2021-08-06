import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://localhost:5000',
    redirectUri: window.location.origin,
    clientId: 'phs.tripcalculator.webapp',
    scope: 'openid profile roles phs.tripcalculator.webapi',
    postLogoutRedirectUri: 'https://localhost:44396',
}
