import { Route } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { isAuthenticated } from './auth/auth.guard';
import { BingoComponent } from './bingo/bingo.component';
import { GamesComponent } from './games/games.component';

export const appRoutes: Route[] = [
  { component: AuthComponent, path: '', pathMatch: 'full' },
  { canActivate: [isAuthenticated], component: GamesComponent, path: 'games' },
  { canActivate: [isAuthenticated], component: BingoComponent, path: 'games/:id' },
];
