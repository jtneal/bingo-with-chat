import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDto } from '@bingo-with-chat/common';
import {
  Subject,
  debounceTime,
  finalize,
  firstValueFrom,
  fromEvent,
  takeUntil,
} from 'rxjs';

import { AlignmentHandler } from './alignment.handler';
import { BingoService } from './bingo.service';
import { Router } from '@angular/router';

/**
 * Button to save
 * Auto bingo key hex / uuid
 * Anyone that loads bingo key gets random card but refreshing keeps the card and all in progress stuff.
 * Have to be logged in to play, no way around it and limits people to 1 card and no cheating
 * Login with twitch, kick, youtube, etc.
 * Regular players instead of textarea get a text only box or uneditable textarea when clicked creates an X w/ $blueFade
 * Terminology Vocabulary: Card, Row, Column, Space
 * Normal bingo is 15 options per column. 5 in the normal card, up to 10 extra lines
 * Make free space required
 * Add google analytics or something so i know where visitors might be coming from
 * Update uses same stuff but says Update
 * Need to setup getGame call to be dynamic based on param, but if new use blank
 */

@Component({
  selector: 'bingo-with-chat-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss',
})
export class BingoComponent implements OnDestroy {
  @ViewChild('cardElement')
  private readonly cardElement!: ElementRef;

  @ViewChildren('textareaElement')
  private readonly textareaElements!: ElementRef[];

  private readonly destroy$ = new Subject<void>();

  public game$ = this.service
    .getGame('id')
    .pipe(finalize(() => setTimeout(() => this.setup())));

  public constructor(
    private readonly router: Router,
    private readonly service: BingoService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async onSubmit(card: CardDto): Promise<void> {
    const apiCard = await firstValueFrom(this.service.createGame(card));

    if (apiCard.success) {
      this.router.navigate([`games/${apiCard.id}`]);
    } else {
      console.log('Error:', apiCard.error);
    }
  }

  private setup(): void {
    this.textareaElements.forEach((textarea) => {
      AlignmentHandler.align(textarea.nativeElement);
    });

    fromEvent(this.cardElement.nativeElement, 'keyup')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((event) =>
        AlignmentHandler.align(
          (event as KeyboardEvent).target as HTMLTextAreaElement
        )
      );
  }
}
