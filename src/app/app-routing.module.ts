import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';

const routes: Routes = [
   {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
      canActivate: [ isNotAuthenticatedGuard ],
   },
   {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),
      canActivate: [ isAuthenticatedGuard ],
   },
   {
      path: '**',
      redirectTo: 'auth',
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
