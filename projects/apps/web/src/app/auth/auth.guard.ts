import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthState } from './auth.state';

export const isAuthenticated: CanActivateFn = () => {
  const authState = inject(AuthState);
  const router = inject(Router);

  if (authState.idToken) {
    const url = localStorage.getItem('bwc-redirect');

    if (url) {
      localStorage.removeItem('bwc-redirect');

      return router.createUrlTree([url]);
    }

    return true;
  }

  const { pathname } = new URL(window.location.href);

  if (pathname !== '/') {
    localStorage.setItem('bwc-redirect', pathname);
  }

  return router.createUrlTree(['/']);
};
