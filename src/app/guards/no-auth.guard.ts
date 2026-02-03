import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

export const noAuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = await authService.isAuthenticated();

  if (!isAuth) {
    return true;
  }

  router.navigate(['/home'], { replaceUrl: true });
  return false;
};
