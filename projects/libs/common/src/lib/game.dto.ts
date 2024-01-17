import { CardDto } from './card.dto';

export interface GameDto {
  author: string;
  card: CardDto;
  id: string;
  title: string;
}

export type CreateGameErrorDto = { error: string; success: false };
export type CreateGameSuccessDto = { id: string; author: string; success: true };
export type CreateGameResponseDto = CreateGameErrorDto | CreateGameSuccessDto;
