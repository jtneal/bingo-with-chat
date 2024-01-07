import {
  CardDto,
  CreateGameResponseDto,
  GameDto,
} from '@bingo-with-chat/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get(':id')
  getGame(@Param('id') id: string): GameDto {
    return this.service.getGame(id);
  }

  @Post()
  createGame(@Body() card: CardDto): CreateGameResponseDto {
    return this.service.createGame(card);
  }
}
