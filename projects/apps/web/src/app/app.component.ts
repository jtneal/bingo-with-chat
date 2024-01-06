import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'bingo-with-chat-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public darkTheme = localStorage.getItem('bingo-theme') !== 'light';
  public year = new Date().getFullYear();

  public switchTheme(): void {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('bingo-theme', this.darkTheme ? 'dark' : 'light');
  }
}
