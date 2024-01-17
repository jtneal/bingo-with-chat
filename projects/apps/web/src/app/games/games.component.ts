import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { GamesService } from './games.service';

@Component({
  selector: 'bingo-with-chat-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  public games$ = this.service.getGames();

  public constructor(private readonly service: GamesService) {}
}
