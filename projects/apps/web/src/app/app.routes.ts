import { Route } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { BingoComponent } from './bingo/bingo.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: AuthComponent },
  // { path: '', pathMatch: 'full', redirectTo: '/games/new' },
  { component: BingoComponent, path: 'games/:id' },
];
