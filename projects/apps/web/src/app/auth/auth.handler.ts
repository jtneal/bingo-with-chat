import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as jose from 'jose';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthState } from './auth.state';

@Injectable({ providedIn: 'root' })
export class AuthHandler {
  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly service: AuthService,
    private readonly state: AuthState
  ) {}

  // This method has to be public so that it can be called from the AppComponent
  public async validateTokensFromCallback(): Promise<boolean> {
    // Get the callback parameters from the URL Hash
    const hashParams = new URLSearchParams(this.document.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const idToken = hashParams.get('id_token');
    const state = hashParams.get('state');

    // If any of the required params are missing, we don't have a valid callback
    if (!accessToken || !idToken || !state) {
      return false;
    }

    // If any of the required params are invalid, we have a callback error
    if (!this.validateNonce(state) || !(await this.validateTokens(accessToken, idToken))) {
      this.state.showError = true;

      return false;
    }

    // If we get here, we have a valid callback
    this.state.accessToken = accessToken;
    this.state.idToken = jose.decodeJwt(idToken);

    // Persist the tokens to local storage
    localStorage.setItem('bwc-access-token', accessToken);
    localStorage.setItem('bwc-id-token', idToken);

    return true;
  }

  // This method has to be public so that it can be called from the AppComponent
  public async validateTokensFromLocalStorage(): Promise<boolean> {
    // Get the tokens from local storage
    const accessToken = localStorage.getItem('bwc-access-token');
    const idToken = localStorage.getItem('bwc-id-token');

    // If either of the required tokens are missing, we have nothing to do
    if (!accessToken || !idToken) {
      return false;
    }

    // If either of the required tokens are invalid, we need to reset some stuff
    if (!(await this.validateTokens(accessToken, idToken))) {
      localStorage.removeItem('bwc-access-token');
      localStorage.removeItem('bwc-id-token');

      return false;
    }

    // If we get here, we have valid tokens
    this.state.accessToken = accessToken;
    this.state.idToken = jose.decodeJwt(idToken);

    return true;
  }

  private async validateTokens(accessToken: string, idToken: string): Promise<boolean> {
    if (!(await this.validateAccessToken(accessToken))) {
      return false;
    }

    if (!(await this.validateIdToken(idToken))) {
      return false;
    }

    return true;
  }

  private validateNonce(nonce: string): boolean {
    const isValid = nonce === localStorage.getItem('bwc-nonce');

    if (isValid) {
      localStorage.removeItem('bwc-nonce');
    }

    return isValid;
  }

  private async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      const validate = await firstValueFrom(this.service.validate(accessToken));

      if (!validate.expires_in) {
        throw new Error('Missing expires_in claim');
      }

      return validate.expires_in > 0;
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  private async validateIdToken(idToken: string): Promise<boolean> {
    try {
      const jwks = jose.createRemoteJWKSet(new URL('https://id.twitch.tv/oauth2/keys'));
      const token = await jose.jwtVerify(idToken, jwks);

      if (!token.payload.exp) {
        throw new Error('Missing exp claim');
      }

      return token.payload.exp > Math.round(Date.now() / 1000);
    } catch (error) {
      console.error(error);
    }

    return false;
  }
}
