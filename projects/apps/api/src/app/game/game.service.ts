import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { CardDto, CreateGameResponseDto, GameDto } from '@bwc/common';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class GameService {
  public constructor(private readonly dynamo: DynamoDBClient) {}

  public getGame(id: string): GameDto {
    console.log(id);

    return {
      id: '',
      title: '',
      card: [
        [
          'F Bomb Dropped',
          'Show starts late',
          'BG3 wins an award',
          'Destiny wins an award',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo ac tortor quis ullamcorper. Sed ultricies purus a sapien lacinia, vitae imperdiet turpis malesuada.',
        ],
        [
          'Show ends late',
          'Technical difficulties',
          "Crowd boo's",
          'Wrap up music plays during thank you speech',
          'Someone trips and falls down',
        ],
        [
          'Unexpected celeb comes on stage',
          'Someone sneezes on stage',
          'FREE!',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo ac tortor quis ullamcorper. Sed ultricies purus a sapien lacinia, vitae imperdiet turpis malesuada.',
          'Half Life 3 announced',
        ],
        [
          'Destiny 3 announced',
          'Super Cringe',
          'Someone talks with gum in their mouth',
          'Someone wearing pajamas',
          'Pedro Eustache is shown jamming out on an instrument',
        ],
        [
          'Thank you speech is cut off after being far too long',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo ac tortor quis ullamcorper. Sed ultricies purus a sapien lacinia, vitae imperdiet turpis malesuada.',
          'Aliens or UFOs are mentioned',
          'War/genocide is mentioned',
          'Layoffs are mentioned',
        ],
      ],
    };
  }

  // This is only used for local setup
  // public async createTable(): Promise<{ success: boolean }> {
  //   const command = new CreateTableCommand({
  //     TableName: process.env.TABLE_NAME,
  //     AttributeDefinitions: [
  //       { AttributeName: 'owner', AttributeType: 'S' },
  //       { AttributeName: 'updatedAt', AttributeType: 'S' },
  //     ],
  //     KeySchema: [
  //       { AttributeName: 'owner', KeyType: 'HASH' },
  //       { AttributeName: 'updatedAt', KeyType: 'RANGE' },
  //     ],
  //     ProvisionedThroughput: {
  //       ReadCapacityUnits: 5,
  //       WriteCapacityUnits: 5,
  //     },
  //   });

  //   try {
  //     await this.dynamo.send(command);
  //   } catch (error) {
  //     console.error(error);

  //     return { success: false };
  //   }

  //   return { success: true };
  // }

  public async createGame(card: CardDto): Promise<CreateGameResponseDto> {
    const id = randomUUID();
    const owner = 'randomTwitchId';

    const command = new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: id },
        owner: { S: owner },
        title: { S: 'Untitled' },
        card: { S: JSON.stringify(card) },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    });

    try {
      await this.dynamo.send(command);
    } catch (error) {
      console.error(error);

      return { error: 'Failed to create game', success: false };
    }

    return { id, owner, success: true };
  }
}
