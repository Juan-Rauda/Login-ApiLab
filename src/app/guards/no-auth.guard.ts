import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const noAuthGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = getAuth();

  const user = await new Promise<any>(resolve => {
    const unsub = onAuthStateChanged(auth, u => {
      unsub();
      resolve(u);
    });
  });

  // ✅ dejar pasar si NO hay usuario
  if (!user) {
    return true;
  }

  // ✅ dejar pasar si NO está verificado
  if (user && !user.emailVerified) {
    return true;
  }

  // 🔒 solo usuarios verificados van al home
  router.navigate(['/home'], { replaceUrl: true });
  return false;
};
