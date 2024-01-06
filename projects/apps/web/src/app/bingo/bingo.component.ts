import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

import { AlignmentHandler } from './alignment.handler';

/**
 * Button to save
 * Auto bingo key hex / uuid
 * Anyone that loads bingo key gets random card but refreshing keeps the card and all in progress stuff.
 * Have to be logged in to play, no way around it and limits people to 1 card and no cheating
 * Login with twitch, kick, youtube, etc.
 * Regular players instead of textarea get a text only box or uneditable textarea when clicked creates an X w/ $blueFade
 */

const mock =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo ac tortor quis ullamcorper. Sed ultricies purus a sapien lacinia, vitae imperdiet turpis malesuada.';

@Component({
  selector: 'bingo-with-chat-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss',
})
export class BingoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardElement')
  private readonly cardElement!: ElementRef;

  @ViewChildren('textareaElement')
  private readonly textareaElements!: ElementRef[];

  private readonly destroy$ = new Subject<void>();

  public card = [
    [
      'F Bomb Dropped',
      'Show starts late',
      'BG3 wins an award',
      'Destiny wins an award',
      mock,
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
      mock,
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
      mock,
      'Aliens or UFOs are mentioned',
      'War/genocide is mentioned',
      'Layoffs are mentioned',
    ],
  ];

  public ngAfterViewInit(): void {
    // Setup keyup event listener to align cells
    fromEvent(this.cardElement.nativeElement, 'keyup')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((event) =>
        AlignmentHandler.align(
          (event as KeyboardEvent).target as HTMLTextAreaElement
        )
      );

    // If there is existing data, we need to align all cells on init
    this.textareaElements.forEach((textarea) => {
      AlignmentHandler.align(textarea.nativeElement);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
