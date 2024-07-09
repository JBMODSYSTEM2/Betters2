import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError } from 'rxjs/operators';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1),
      map((user: firebase.User) => {
        // Si el usuario ya está autenticado, redirige a la página principal
        if (user) {
          return this.router.parseUrl('/main');
        } else {
          // Si el usuario no está autenticado, permite el acceso a la página de login
          return true;
        }
      }),
      catchError((error) => {
        console.error('Error obteniendo el estado de autenticación:', error);
        return of(this.router.parseUrl('/login'));
      })
    );
  }
}
