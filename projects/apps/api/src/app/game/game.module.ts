import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [GameController],
  imports: [HttpModule],
  providers: [
    GameService,
    {
      inject: [ConfigService],
      provide: DynamoDBClient,
      useFactory: (config: ConfigService) =>
        new DynamoDBClient({
          credentials: {
            accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: config.get<string>('AWS_SECRET_ACCESS_KEY'),
          },
          endpoint: config.get<string>('AWS_ENDPOINT_URL_DYNAMODB'),
          region: config.get<string>('AWS_DEFAULT_REGION'),
        }),
    },
  ],
})
export class GameModule {}
