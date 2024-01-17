import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGameResponseDto, GameDto } from '@bwc/common';
import { Observable } from 'rxjs';
import { AuthState } from '../auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  public constructor(private readonly auth: AuthState, private readonly http: HttpClient) {}

  public getGame(author: string, id: string): Observable<GameDto> {
    return this.http.get<GameDto>(`/api/games/${author}/${id}`, {
      headers: { Authorization: `Bearer ${this.auth.idToken}` },
    });
  }

  public createGame(game: GameDto): Observable<CreateGameResponseDto> {
    return this.http.post<CreateGameResponseDto>('/api/games', game, {
      headers: { Authorization: `Bearer ${this.auth.idToken}` },
    });
  }
}
