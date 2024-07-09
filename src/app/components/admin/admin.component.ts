import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SemanalComponent } from './informes/semanal/semanal.component';
import { MensualComponent } from "./informes/mensual/mensual.component";
import { CuentasComponent } from './cuentas/cuentas.component';
import { AdminpokerComponent } from "./adminpoker/adminpoker.component";
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AsignacionComponent } from './asignacion/asignacion.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [
      MatTabsModule,
      SemanalComponent,
      MensualComponent,
      CuentasComponent,
      AdminpokerComponent,
      ContabilidadComponent,
      AsignacionComponent,
      RouterLink,
      RouterLinkActive,
      RouterOutlet,
      MatSidenavModule,
      CommonModule,
    ]
})
export class AdminComponent {
  displayName: any;

  constructor(public router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      this.displayName = user ? user.displayName.split(' ')[0] : null;
    });
   }

  firebaseService = inject(LoginService);

  logOut(){
    this.firebaseService.logOut();
    console.log('Sesión cerrada');
    this.router.navigate(['/']);
  }

  shouldShowNavbar(): boolean {
    const excludedRoutes = ['/', '/ejecutor', '/user', '/agent',];
    return !excludedRoutes.includes(this.router.url);
  }
}
