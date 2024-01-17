import { Component, ElementRef, Inject, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CardDto, GameDto } from '@bwc/common';
import { Subject, debounceTime, finalize, firstValueFrom, fromEvent, takeUntil } from 'rxjs';

import { AlignmentHandler } from './alignment.handler';
import { BingoService } from './bingo.service';
import { Router } from '@angular/router';
import { AlertComponent, ButtonComponent } from '@bwc/components';
import { AppService } from '../app.service';
import { AuthState } from '../auth/auth.state';

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
 * It's not meant for people to just login and look for existing bingo games.
 * Therefore, there's no reason for the screenshots
 * So, login with an active game, assumes you want to look at YOUR existing games
 * If you do not have existing games, it will take you to the new page immediately
 * Until you have at least one saved game, you will not see the games page
 * Need to add deeplink from login to auth component
 * Statistics on the home page about # of games, # of players, etc.
 * Might need to stop using id-token as part of auth process
 * I think the id token expires pretty quickly and causing logout
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
    private readonly auth: AuthState,
    @Inject(DOCUMENT) private readonly document: Document,
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
      const game = {
        card,
        id: 'new',
        author: this.auth.token.sub,
        title: 'Untitled',
      } as GameDto;

      const apiGame = await firstValueFrom(this.service.createGame(game));

      if (!apiGame.success) {
        throw new Error(apiGame.error);
      }

      this.router.navigate(['games', apiGame.author, apiGame.id]);
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
