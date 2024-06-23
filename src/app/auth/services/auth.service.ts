import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   private readonly baseUrl: string = environments.BACKEND_URL;

   private http = inject(HttpClient);

   private _currentUser = signal<User | null>(null);
   private _authStatus = signal<AuthStatus>(AuthStatus.checking);

   // Fuera de la clase
   public currentUser = computed(() => this._currentUser());
   public authStatus = computed(() => this._authStatus());

   constructor() {
      this.checkAuthStatus().subscribe();
   }

   private setAuthentication(user: User, token: string): boolean {
      this._currentUser.set(user);
      this._authStatus.set(AuthStatus.authenticated);

      //Para renovar el token
      localStorage.setItem('token', token);
      // console.log({ user, token });

      return true;
   }

   public logout() {
      localStorage.removeItem('token');
      this._currentUser.set(null);
      this._authStatus.set(AuthStatus.notAuthenticated);
   }

   public login(email: string, password: string): Observable<boolean> {

      const url: string = `${this.baseUrl}/auth/login`;
      const body = { email: email, password: password };

      return this.http.post<LoginResponse>(url, body)
         .pipe(
            // tap(({ user, token }) => {

            //    this.setAuthentication(user, token)


            //    this._currentUser.set(user);
            //    this._authStatus.set(AuthStatus.authenticated);
            //    localStorage.setItem('token', token);
            //    console.log({ user, token });
            // }),
            map(({user, token}) => this.setAuthentication(user, token)),

            // TODO: Errores
            catchError(({ error }) => {
               // console.log(error);
               const { message } = error;
               return throwError(() => message);
            })
         )


      return of(true);
   }

   checkAuthStatus(): Observable<boolean> {
      const url = `${this.baseUrl}/auth/check-token`;
      const token = localStorage.getItem('token');

      if (!token) {
         this.logout();
      }

      const headers = new HttpHeaders()
         .set('Authorization', `Bearer ${token}`);

      return this.http.get<CheckTokenResponse>(url, { headers: headers })
         .pipe(
            // map(({ token, user }) => {
            //    this._currentUser.set(user);
            //    this._authStatus.set( AuthStatus.authenticated );
            //    // se renueva el token
            //    localStorage.setItem('token', token);

            //    return true;
            // }),
            map( ({token, user}) => this.setAuthentication(user, token)),
            //Error
            catchError(() => of(false))
         )




   }
}
