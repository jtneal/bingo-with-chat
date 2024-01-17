import { CreateGameResponseDto, GameDto } from '@bwc/common';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Get()
  @UseGuards(AuthGuard)
  getGames(@Request() req): Promise<GameDto[]> {
    return this.service.getGames(req.user.sub);
  }

  @Get(':author/:id')
  @UseGuards(AuthGuard)
  getGame(@Param('author') author: string, @Param('id') id: string): Promise<GameDto> {
    return this.service.getGame(author, id);
  }

  // This is only used for local setup
  @Post('create-table')
  createTable(): Promise<{ success: boolean }> {
    return this.service.createTable();
  }

  @Post()
  @UseGuards(AuthGuard)
  createGame(@Request() req, @Body() game: GameDto): Promise<CreateGameResponseDto> {
    return this.service.createGame(game, req.user.sub);
  }
}
