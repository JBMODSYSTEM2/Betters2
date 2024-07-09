import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DinamarcaComponent } from './dinamarca/dinamarca.component';
import { ColombiaComponent } from './colombia/colombia.component';
import { BrasilComponent } from './brasil/brasil.component';
import { AustraliaComponent } from './australia/australia.component';
import { ChileComponent } from './chile/chile.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [ MatTabsModule, DinamarcaComponent, ColombiaComponent, BrasilComponent, AustraliaComponent, ChileComponent, CommonModule ],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css'
})
export class CuentasComponent {
  listadoCasasdeApuestas = ['Unibet', 'Cashpoint', '888-Sport', 'Bwin', 'LeoVegas', 'Marathonbet', 'MrGreen','Nordicbet', 'Betfair']

}
