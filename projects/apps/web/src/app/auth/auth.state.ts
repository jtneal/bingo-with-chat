import { Injectable } from '@angular/core';

import { IdToken } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthState {
  public accessToken = '';
  public idToken = '';
  public token = {} as IdToken;
  public showError = false;
}
