import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgenteapuestasComponent } from "./agenteapuestas/agenteapuestas.component";

@Component({
    selector: 'app-agente',
    standalone: true,
    templateUrl: './agente.component.html',
    styleUrl: './agente.component.css',
    imports: [
      AgenteapuestasComponent,
      RouterLink,
      RouterLinkActive,
      RouterOutlet,
      CommonModule,
      MatSidenavModule,
      MatTabsModule
     ]
})
export class AgenteComponent {
  constructor(public router: Router) { }
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
