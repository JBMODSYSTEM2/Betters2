import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModelModule { }

export interface Agente {
  id: string;
  nombre: string;
}

export interface Referido {
  id: string;
  nombre: string;
  agenteId: string;
  ejecutorId?: string;
}

export interface Ejecutor {
  id: string;
  nombre: string;
}
