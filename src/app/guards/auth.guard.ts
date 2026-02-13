import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = getAuth();

  const user = await new Promise<any>(resolve => {
    const unsub = onAuthStateChanged(auth, u => {
      unsub();
      resolve(u);
    });
  });

  if (user && user.emailVerified) {
    return true;
  }

  router.navigate(['/auth'], { replaceUrl: true });
  return false;
};
