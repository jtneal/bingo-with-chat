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
 * Light Mode / Dark Mode toggle
 * Button to save
 * Auto bingo key hex
 * Anyone that loads bingo key gets random card but refreshing keeps the card and all in progress stuff.
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
    ['', '', '', '', mock],
    ['', '', '', '', ''],
    ['', '', 'Free!', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
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
