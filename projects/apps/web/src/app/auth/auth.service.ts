import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthResponse } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public constructor(private readonly http: HttpClient) {}

  public validate(token: string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>('https://id.twitch.tv/oauth2/validate', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
