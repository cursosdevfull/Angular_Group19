import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authorizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('accessToken');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  const payload: any = jwtDecode(token);
  const userRoles = payload.roles.map((el: any) => el.name);
  const { roles } = route.data;

  return userRoles.some((role: string) => roles.includes(role));
};
