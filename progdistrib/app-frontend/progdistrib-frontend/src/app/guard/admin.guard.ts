import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const adminGuard: CanActivateFn = (route, state): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getUserRole();

  if (role === 'Admin') {
    return true;
  } else{
    router.navigate(['locataire-dashboard'])
    return false
  } 
};
