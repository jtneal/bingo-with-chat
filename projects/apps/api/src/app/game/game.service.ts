import { CreateTableCommand, DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { SaveGameResponseDto, GameDto } from '@bwc/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class GameService {
  public constructor(private readonly dynamo: DynamoDBClient) {}

  public async getGames(userId: string): Promise<GameDto[]> {
    const command = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: 'author = :author',
      Limit: 100,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':author': { S: userId },
      },
    });

    const output = await this.dynamo.send(command);

    return output.Items.map((item) => unmarshall(item)) as GameDto[];
  }

  public async getGame(author: string, id: string): Promise<GameDto> {
    if (id === 'new') {
      return {
        author,
        card: [
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', 'FREE!', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
        ],
        id,
        title: 'Untitled',
      };
    }

    const command = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: 'author = :author',
      Limit: 100,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':author': { S: author },
      },
    });

    const output = await this.dynamo.send(command);

    if (!output.Items.length) {
      throw new NotFoundException();
    }

    return output.Items.map((item) => unmarshall(item)).find((game) => game.id === id) as GameDto;
  }

  // This is only used for local setup
  public async createTable(): Promise<{ success: boolean }> {
    const command = new CreateTableCommand({
      TableName: process.env.TABLE_NAME,
      AttributeDefinitions: [
        { AttributeName: 'author', AttributeType: 'S' },
        { AttributeName: 'updatedAt', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'author', KeyType: 'HASH' },
        { AttributeName: 'updatedAt', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });

    try {
      await this.dynamo.send(command);
    } catch (error) {
      console.error(error);

      return { success: false };
    }

    return { success: true };
  }

  public async saveGame(game: GameDto, author: string): Promise<SaveGameResponseDto> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const command = new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: id },
        author: { S: author },
        title: { S: 'Untitled' },
        card: { L: game.card.map((row) => ({ L: row.map((cell) => ({ S: cell })) })) },
        createdAt: { S: now },
        updatedAt: { S: now },
      },
    });

    try {
      await this.dynamo.send(command);
    } catch (error) {
      console.error(error);

      return { error: 'Failed to create game', success: false };
    }

    return { id, author: author, success: true };
  }
}
