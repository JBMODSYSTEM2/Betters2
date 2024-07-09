import { DataService } from './../../ejecutor/data.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-agenteregisterreferido',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './agenteregisterreferido.component.html',
  styleUrl: './agenteregisterreferido.component.css'
})
export class AgenteregisterreferidoComponent {

  constructor(private dataService: DataService) { }

  showAdditionalFields = false;
  showFirstForm = true;

  initialFormData = {
    id: this.dataService.getUid() ,
    agente: this.dataService.getnombre().split(' ')[0],
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha: new Date(),
    casasDeApuestas: {
      unibet: false,
      cashpoint: false,
      bwin: false,
      codere: false,
      mrGreen: false,
      ladbroker: false,
      goldenPalace: false,
      leoVegas: false
    }
  };

  formData = {...this.initialFormData};

  onNextButtonClick(): void {
    this.showAdditionalFields = true;
    this.showFirstForm = false;
  }

  onBackButtonClick(): void {
    this.showAdditionalFields = false;
    this.showFirstForm = true;
  }

  async registrarReferido() {
    // Generar un ID único para cada casa de apuestas seleccionada
    const response = await this.dataService.registrarReferido(this.formData, this.dataService.getnombre());
    // console.log(response);
    this.onBackButtonClick()
    this.formData = {...this.initialFormData};
    Object.keys(this.formData.casasDeApuestas).forEach(apuesta => this.formData.casasDeApuestas[apuesta] = false);
  }

  alMenosUnaCasaDeApuestasSeleccionada() {
    for (let casa in this.formData.casasDeApuestas) {
      if (this.formData.casasDeApuestas[casa]) {
        return true;
      }
    }
    return false;
  }
}
