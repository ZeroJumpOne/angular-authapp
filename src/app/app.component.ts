import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.css'
})
export class AppComponent {
   title = 'authApp';

   private authService = inject(AuthService);
   private router = inject(Router);

   public finishedAuthCheck = computed<boolean>(() => {
      // console.log(this.authService.authStatus());

      if (this.authService.authStatus() === AuthStatus.checking) {
         return false;
      }

      return true;
   });

   public authStatusChangeEffect = effect(() => {

      switch (this.authService.authStatus()) {

         case AuthStatus.checking:
            return;
         case AuthStatus.authenticated:
            this.router.navigateByUrl('/dashboard');
            return;
         case AuthStatus.notAuthenticated:
            this.router.navigateByUrl('/auth/login');
            return;
      }

      console.log('authStatus:', this.authService.authStatus());

   });

}
