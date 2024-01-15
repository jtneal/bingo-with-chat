import { CardDto, CreateGameResponseDto, GameDto } from '@bwc/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get(':id')
  getGame(@Param('id') id: string): GameDto {
    return this.service.getGame(id);
  }

  // This is only used for local setup
  // @Post('create-table')
  // createTable(): Promise<{ success: boolean }> {
  //   return this.service.createTable();
  // }

  @Post()
  createGame(@Body() card: CardDto): Promise<CreateGameResponseDto> {
    return this.service.createGame(card);
  }
}
