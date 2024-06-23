import { Component, Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-frm-login',
  templateUrl: './frm-login.component.html',
  styleUrl: './frm-login.component.css'
})
export class FrmLoginComponent {

   // @Injectable() fb = new FormBuilder();
   private fb          = inject( FormBuilder );
   private authService = inject( AuthService) ;
   private router      = inject( Router );

   public frmLogin: FormGroup = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
   });

   public login() {

      const { email, password } = this.frmLogin.value;

      this.authService.login( email, password )
         .subscribe({
            next: () => this.router.navigateByUrl('dashboard'),
            error: ( message)  => {
               // console.log( message );
               Swal.fire('Error', message, 'error');
            }
         });
   }

}
