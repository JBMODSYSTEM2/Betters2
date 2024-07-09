import { Component, inject } from '@angular/core';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  // Inyectamos el servicio de inicio de sesión
  loginService = inject(LoginService);
  durationInSeconds = 5;
  // Creamos un formulario con dos campos: email y password
  form = new FormGroup({ email: new FormControl('', [Validators.required, Validators.email]), password: new FormControl('', [Validators.required])});

  constructor(
    private router: Router,
    ) {}

  logIn(){
    // Creamos un objeto de tipo Login con los valores del formulario
    const user: Login = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    // Llamamos al método signIn del servicio de inicio de sesión
    this.loginService.signIn(user).then(() => {
      // Si el inicio de sesión es exitoso, redirigimos a la página de administrador
      this.router.navigate(['/admin']);
    });

  }

  signinConGoogle() {
    this.loginService.signinConGoogle();
    this.router.navigate(['/admin']);
  }
}

