import { Test, TestingModule } from '@nestjs/testing';

import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<GameController>(GameController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
