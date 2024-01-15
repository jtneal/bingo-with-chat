import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardDto, CreateGameResponseDto, GameDto } from '@bwc/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  public constructor(private readonly http: HttpClient) {}

  public getGame(id: string): Observable<GameDto> {
    return this.http.get<GameDto>(`/api/games/${id}`);
  }

  public createGame(card: CardDto): Observable<CreateGameResponseDto> {
    return this.http.post<CreateGameResponseDto>('/api/games', card);
  }
}
