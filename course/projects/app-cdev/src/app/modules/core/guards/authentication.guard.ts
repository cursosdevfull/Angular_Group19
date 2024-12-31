import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthAdapter } from '../../auth/adapters/auth.adapter';
import { AuthPort } from '../../auth/ports/auth.port';

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const port: AuthPort = inject(AuthAdapter);
  const isLogged = port.isUserLogged();

  if (!isLogged) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
