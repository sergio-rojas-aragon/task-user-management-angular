import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';






export const AuthGuard : CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    console.log("guard isLoggedIn", true)
    return true;
  }

  console.log("guard isLoggedIn", false)
  router.navigate(['/login']);
  return false;
  
}
