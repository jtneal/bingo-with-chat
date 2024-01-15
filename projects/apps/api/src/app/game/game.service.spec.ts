import { Test } from '@nestjs/testing';

import { GameService } from './game.service';

describe('AppService', () => {
  let service: GameService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = app.get<GameService>(GameService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
