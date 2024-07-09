import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataServiceAdmin } from '../data.serviceadmin';


@Component({
  selector: 'app-adminregisteragente',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, CommonModule, FormsModule ],
  templateUrl: './adminregisteragente.component.html',
  styleUrl: './adminregisteragente.component.css'
})
export class AdminregisteragenteComponent {

  constructor(private dataService: DataServiceAdmin) { }

  initialFormDataAgente = {
    agente: this.dataService.getUid(),
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    pais: '',
    direccion: '',
  };

  formDataAgente = {...this.initialFormDataAgente};

  async registrarAgente() {
    const response = await this.dataService.registrarYCrearAgente(this.formDataAgente.email, this.formDataAgente.password, this.formDataAgente);
    console.log("Respuesta: ",response);
    console.log("Email: ", this.formDataAgente.email)
    console.log("Password: ",this.formDataAgente.password);
  }
}
