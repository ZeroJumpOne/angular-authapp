import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FrmLoginComponent } from './pages/frm-login/frm-login.component';
import { FrmRegisterComponent } from './pages/frm-register/frm-register.component';

const routes: Routes = [
   {
      path: '',
      component: AuthLayoutComponent,
      children: [
         { path: 'login',    component: FrmLoginComponent},
         { path: 'register', component: FrmRegisterComponent},
         { path: '**',       redirectTo: 'login'},
      ]


   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
