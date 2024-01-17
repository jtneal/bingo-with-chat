import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from '@bwc/components';

import { AppService } from '../app.service';
import { AuthHandler } from './auth.handler';
import { AuthState } from './auth.state';

@Component({
  selector: 'bingo-with-chat-auth',
  standalone: true,
  imports: [AlertComponent, CommonModule],
  providers: [{ provide: Window, useValue: window }],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public authUrl = '';
  public showError = this.document.location.href.includes('error=') || this.state.showError;
  public theme$ = this.app.themeChangedEvent$;

  public constructor(
    private readonly app: AppService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly handler: AuthHandler,
    private readonly router: Router,
    public readonly state: AuthState,
    private readonly window: Window
  ) {}

  public async ngOnInit(): Promise<void> {
    // If we are already authenticated, redirect to the new game page
    if (await this.isAuthenticated()) {
      this.router.navigate(['games', this.state.token.sub]);

      return;
    }

    // If we get here, we need to setup the auth URL so the user can login
    this.setAuthUrl();
  }

  private async isAuthenticated(): Promise<boolean> {
    if (await this.handler.validateTokensFromCallback()) {
      return true;
    }

    if (await this.handler.validateTokensFromLocalStorage()) {
      return true;
    }

    return false;
  }

  private setAuthUrl(): void {
    const nonce = this.generateNonce();

    // Store nonce for comparison when validating tokens in the callback
    localStorage.setItem('bwc-nonce', nonce);

    const query = new URLSearchParams({
      response_type: 'token id_token',
      // force_verify: 'true', // Useful for testing
      client_id: '158jg1jg6no9aepfzp01imufojiwvw',
      redirect_uri: 'http://localhost:4200',
      scope: 'openid',
      claims: '{"id_token":{"preferred_username":null}}',
      state: nonce,
      nonce: nonce,
    });

    this.authUrl = `https://id.twitch.tv/oauth2/authorize?${query}`;
  }

  private generateNonce(): string {
    const seeds = new Uint8Array(16);
    const dec2hex = (dec: number) => dec.toString(16).padStart(2, '0');

    this.window.crypto.getRandomValues(seeds);

    return Array.from(seeds, dec2hex).join('');
  }
}
