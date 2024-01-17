import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDto } from '@bwc/common';
import { Observable } from 'rxjs';

import { AuthState } from '../auth/auth.state';

@Injectable({ providedIn: 'root' })
export class GamesService {
  public constructor(private readonly auth: AuthState, private readonly http: HttpClient) {}

  public getGames(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(`/api/games`, {
      headers: { Authorization: `Bearer ${this.auth.idToken}` },
    });
  }
}
