import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loginService = inject(LoginService);
  displayName: any;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => {
      this.displayName = user ? user.displayName.split(' ')[0] : null;
    });
   }

  logOut(){
    this.loginService.logOut();
  }


}
