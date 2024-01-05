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
 */

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
      '',
      '',
      '',
      '',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo ac tortor quis ullamcorper. Sed ultricies purus a sapien lacinia, vitae imperdiet turpis malesuada.',
    ],
    ['', '', '', '', ''],
    ['', '', 'Free!', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  public ngAfterViewInit(): void {
    fromEvent(this.cardElement.nativeElement, 'keyup')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((event) =>
        AlignmentHandler.align(
          (event as KeyboardEvent).target as HTMLTextAreaElement
        )
      );

    this.textareaElements.forEach((textarea) => {
      AlignmentHandler.align(textarea.nativeElement);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
