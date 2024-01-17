import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveGameResponseDto, GameDto } from '@bwc/common';
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

  public saveGame(game: GameDto): Observable<SaveGameResponseDto> {
    return this.http.post<SaveGameResponseDto>('/api/games', game, {
      headers: { Authorization: `Bearer ${this.auth.idToken}` },
    });
  }
}
