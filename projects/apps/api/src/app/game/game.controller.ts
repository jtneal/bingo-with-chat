import { CardDto, CreateGameResponseDto, GameDto } from '@bwc/common';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { GameService } from './game.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('games')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get()
  @UseGuards(AuthGuard)
  getGames(@Request() req): Promise<GameDto[]> {
    console.log('req.user.sub', typeof req.user.sub, req.user.sub);

    return this.service.getGames(req.user.sub);
  }

  @Get(':id')
  getGame(@Param('id') id: string): GameDto {
    return this.service.getGame(id);
  }

  // This is only used for local setup
  @Post('create-table')
  createTable(): Promise<{ success: boolean }> {
    return this.service.createTable();
  }

  @Post()
  createGame(@Request() req, @Body() card: CardDto): Promise<CreateGameResponseDto> {
    return this.service.createGame(card, req.user.sub);
  }
}
