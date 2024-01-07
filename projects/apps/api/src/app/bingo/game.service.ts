import {
  CardDto,
  CreateGameResponseDto,
  GameDto,
} from '@bingo-with-chat/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
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

  public createGame(card: CardDto): CreateGameResponseDto {
    // Mongoose save
    console.log(card);

    return { id: 'id', success: true };
  }
}
