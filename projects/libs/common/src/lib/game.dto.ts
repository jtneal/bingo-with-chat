import { CardDto } from './card.dto';

export interface GameDto {
  author: string;
  card: CardDto;
  id: string;
  title: string;
}

export type SaveGameErrorDto = { error: string; success: false };
export type SaveGameSuccessDto = { id: string; author: string; success: true };
export type SaveGameResponseDto = SaveGameErrorDto | SaveGameSuccessDto;
