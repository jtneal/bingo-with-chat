import { Route } from '@angular/router';
import { BingoComponent } from './bingo/bingo.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/games/new' },
  { component: BingoComponent, path: 'games/:id' },
];
