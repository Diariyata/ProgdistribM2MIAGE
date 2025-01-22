import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    //console.log('Utilisateur authentifié');
    return true;
  }else{
    //console.log('Utilisateur non authentifié');
    router.navigate(['/auth/login'])
    return false
  }
};
