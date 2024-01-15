import { Component, ElementRef, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDto } from '@bwc/common';
import { Subject, debounceTime, finalize, firstValueFrom, fromEvent, takeUntil } from 'rxjs';

import { AlignmentHandler } from './alignment.handler';
import { BingoService } from './bingo.service';
import { Router } from '@angular/router';
import { AlertComponent, ButtonComponent } from '@bwc/components';
import { AppService } from '../app.service';

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
  imports: [AlertComponent, ButtonComponent, CommonModule],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss',
})
export class BingoComponent implements OnDestroy {
  @ViewChild('cardElement') private readonly cardElement!: ElementRef;
  @ViewChildren('textareaElement') private readonly textareaElements!: ElementRef[];

  public game$ = this.service.getGame('id').pipe(finalize(() => setTimeout(() => this.setup())));
  public showError = false;
  public showSuccess = false;
  public theme$ = this.app.themeChangedEvent$;
  public saveInProgress = false;
  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly app: AppService,
    private readonly router: Router,
    private readonly service: BingoService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async onSubmit(card: CardDto): Promise<void> {
    this.saveInProgress = true;
    this.showError = false;
    this.showSuccess = false;

    try {
      const apiCard = await firstValueFrom(this.service.createGame(card));

      if (!apiCard.success) {
        throw new Error(apiCard.error);
      }

      this.router.navigate(['games', apiCard.id]);
      this.saveInProgress = false;
      this.showSuccess = true;
    } catch (error) {
      console.error(error);
      this.saveInProgress = false;
      this.showError = true;
    }
  }

  private setup(): void {
    this.textareaElements.forEach((textarea) => AlignmentHandler.align(textarea.nativeElement));

    fromEvent(this.cardElement.nativeElement, 'keyup')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((event) => AlignmentHandler.align((event as KeyboardEvent).target as HTMLTextAreaElement));
  }
}
