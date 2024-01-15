import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Theme } from '@bwc/common';

import { AppService } from './app.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'bingo-with-chat-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public theme = (localStorage.getItem('bingo-theme') || this.service.themeDefault) as Theme;
  public year = new Date().getFullYear();

  public constructor(private readonly service: AppService) {}

  public ngOnInit(): void {
    this.service.themeChangedEvent.next(this.theme);
  }

  public switchTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('bingo-theme', this.theme);
    this.service.themeChangedEvent.next(this.theme);
  }
}
