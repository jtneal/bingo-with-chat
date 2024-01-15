import { CardDto } from './card.dto';

export interface GameDto {
  card: CardDto;
  id: string;
  title?: string;
}

export type CreateGameErrorDto = { error: string; success: false };
export type CreateGameSuccessDto = { id: string; owner: string; success: true };
export type CreateGameResponseDto = CreateGameErrorDto | CreateGameSuccessDto;
