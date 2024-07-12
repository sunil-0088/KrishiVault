import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/screens/auth/services/auth.service';

export const UserNonExistenceGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (user && user!.role) {
        router.navigate(['/access-denied']);
        return false;
      } else {
        return true;
      }
    })
  );
};
