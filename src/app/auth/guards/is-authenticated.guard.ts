import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

   const authService = inject( AuthService );
   const router      = inject( Router );

   // console.log({ estatus: authService.authStatus() });

   if ( authService.authStatus() === AuthStatus.authenticated ) {
      return true;
   }

   if ( authService.authStatus() === AuthStatus.checking ) {
      return false;
   }

   //It's not Authenticated
   router.navigateByUrl('/auth/login');

   const url = state.url;
   // localStorage.setItem('url', url);
   // console.log({ url });

   return false;
};
