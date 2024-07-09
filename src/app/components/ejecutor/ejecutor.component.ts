import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SemanalComponent } from './informes/semanal/semanal.component';
import { MensualComponent } from "./informes/mensual/mensual.component";
import { ApuestaComponent } from './apuesta/apuesta.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-ejecutor',
    standalone: true,
    templateUrl: './ejecutor.component.html',
    styleUrl: './ejecutor.component.css',
    imports: [
      MatTabsModule,
      SemanalComponent,
      MensualComponent,
      ApuestaComponent,
      MatIcon,
      FormsModule,
      CommonModule,
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      MatSidenavModule
    ]
})
export class EjecutorComponent {
  //Get y total suma de apuestas de trademate y betbuerger
  getapuestasbetburger: { id: string, inputData: number}[];
  getapuestastrademate: { id: string, inputData: number}[];
  totalBetburger = 0;
  totalTrademate = 0;

  //
  editingValue: number;
  editingId: string;
  numberofObjects: number;

  constructor(private dataService: DataService, public router: Router) {
    this.dataService.getApuestas().subscribe(apuestasbetburger => {
      this.getapuestasbetburger = apuestasbetburger;
      this.totalBetburger = apuestasbetburger.reduce((sum, apuesta) => sum + Number(apuesta.inputData), 0);
      this.numberofObjects = apuestasbetburger.length;
    });

    this.dataService.getApuestasTrademate().subscribe(apuestasTrademate => {
      this.getapuestastrademate = apuestasTrademate;
      this.totalTrademate = apuestasTrademate.reduce((sum, apuesta) => sum + Number(apuesta.inputData), 0);
      this.numberofObjects = apuestasTrademate.length;
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

  numero1: number = 0;
  numero2: number = 0;
  contraria: number = 0;

  result: number = 0;
  result2: number = 0;

  inputData: number;
  fecha: Date;
  data: number[] = [];


  async apuestaBetburger() {
    // console.log(this.inputData);
    // const response = await this.dataService.addApuestaBetburger(this.inputData);
    // console.log(response);
    this.data.push(this.inputData);
    this.totalBetburger += this.inputData;
    this.inputData = null;
  }

  async apuestaTrademate() {
    // console.log(this.inputData);
    // const response = await this.dataService.addApuestatrademate(this.inputData);
    // console.log(response);
    this.data.push(this.inputData);
    this.totalTrademate += this.inputData;
    this.inputData = null;
  }

  async calculateResult(): Promise<void> {
    const porcentaje1 = 1 / this.numero1;
    const porcentaje2 = 1 / this.numero2;
    this.result = Number(((1 - (porcentaje1 + porcentaje2)) * 100).toFixed(2));
  }

  async calculateResultcontrario(): Promise<void> {
    const porcentaje1 = 1 / this.contraria;
    const porcentaje2 = 1 / this.numero1;
    const porcentaje3 = porcentaje1 + porcentaje2;
    const porcentaje4 = (porcentaje1/porcentaje3)*100;
    this.result2 = Number(((((this.numero2*porcentaje4)/100)-1)*100).toFixed(2));
  }

  deleteApuesta(id: string): void {
    this.dataService.deleteApuesta(id).then(() => {
      console.log('Apuesta eliminada');
    });
  }

  ngOnInit(): void {
  }

  isEditing: boolean = false;

  editApuesta(id: string, inputData: number) {
    this.editingId = id;
    this.editingValue = inputData;
    this.isEditing = true;
  }

  updateApuesta(id: string, newInputData: number) {
    this.dataService.updateApuesta(id, newInputData).subscribe(() => {
      this.isEditing = false;
      // console.log('Apuesta actualizada');
    });
  }

  cancelEdit(id: string) {
    this.editingId = null; // resetea el estado de edición
    this.editingValue = null;
    this.isEditing = false;
  }

}

