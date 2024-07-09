import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError } from 'rxjs/operators';
import firebase from 'firebase/compat';



interface RoleUser extends firebase.User {
  role?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UidGuard implements CanActivate {

  private adminUids = ['NOFKcLhlGsdkgeKHUNVMm50Wdjr2', 'cLEvukfLwag06o338Ln7fw3aryw2', 'JPvXpUPa5dQAPXUEryt1xSg5EYr1'];
  private agentsUids = ['NOFKcLhlGsdkgeKHUNVMm50Wdjr2', 'cLEvukfLwag06o338Ln7fw3aryw2', 'JPvXpUPa5dQAPXUEryt1xSg5EYr1'];
  private ejecutorUids = [
    'NOFKcLhlGsdkgeKHUNVMm50Wdjr2', //--Betters -Admin 1
    'cLEvukfLwag06o338Ln7fw3aryw2', //--Adriana - Admin 2
    'JPvXpUPa5dQAPXUEryt1xSg5EYr1', //--Cristian - Admin 3
    'vDYq62A8zLcAVbuX8id8Qyzc8JG2', //--Liset
    'mBf532zYD6aTu8Z2cwCPHn6jz4v1', //--Eduan
    'bExL5xLkF5Nbd2KlfsWbKiUTlFL2', //--Jose
    'CmlBsWid9rU0Q8hRhvFwl0YrsRS2', //--Rodolfo
    'iPxALGcYDkYuTV2Z7d3v5azAXho2', //--Luisa
    'hFRxxDfREceX2j0a26rGaEZJfik2', //--luz
    '0O7Soyw5fEbAP7rbKdaCTirdTEf2', //--Laura
    '1L0zHVfOkiYROnzI2FJ4ic1bL4q2', //--Lucas
  ];

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1),
      map((user: RoleUser | null) => {
        if (user) {
          const roles = [
            { role: 'admin', uids: this.adminUids },
            { role: 'agent', uids: this.agentsUids },
            { role: 'executor', uids: this.ejecutorUids }
          ];

          for (const roleObj of roles) {
            if (roleObj.uids.includes(user.uid)) {
              user.role = roleObj.role;

              if (user.role === 'agent' && !route.url.toString().includes('agent') && !route.url.toString().includes('regisref')) {
                return this.router.parseUrl('/agent');
              } else if (user.role === 'executor' && !route.url.toString().includes('ejecutor') && !route.url.toString().includes('regisref')) {
                return this.router.parseUrl('/ejecutor');
              }
              return true;
            }
          }
        }

        // Permitir el acceso a la ruta 'home' independientemente del estado de autenticación del usuario
        if (route.url.toString().includes('/home')) {
          return true;
        }

        // Redirigir al usuario a la página de inicio de sesión si no tiene permiso
        return this.router.parseUrl('/login');
      })
    );
  }
}
