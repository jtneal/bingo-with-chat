import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

import { AlignmentHandler } from './alignment.handler';

@Component({
  selector: 'bingo-with-chat-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss',
})
export class BingoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardElement') private readonly cardElement!: ElementRef;

  private readonly destroy$ = new Subject<void>();

  public card = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
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
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
