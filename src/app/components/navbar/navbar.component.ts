import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule, MatSidenavModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public router: Router) { }
  firebaseService = inject(LoginService);

  logOut(){
    this.firebaseService.logOut();
    console.log('Sesión cerrada');
    this.router.navigate(['/']);
  }
  // shouldShowNavbar(): boolean {
  //   const excludedRoutes = ['/', '/ejecutor', '/user', '/agent',];
  //   return !excludedRoutes.includes(this.router.url);
  // }


  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
