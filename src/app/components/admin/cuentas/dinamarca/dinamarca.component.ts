import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../ejecutor/data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

export interface Transaction {
  agente: string;
  nombre: string;
  sitio: string;
  depositoinicial: number;
  recargas: number;
  saldofinal: number;
  puerto: string;
  encargado: string;
  estadodecuenta: string;
  fechainicio: string;
  fechafinal: string;
  duracion: string;
}


@Component({
  selector: 'app-dinamarca',
  standalone: true,
  imports: [ MatIcon, MatTableModule, CurrencyPipe, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './dinamarca.component.html',
  styleUrl: './dinamarca.component.css'
})


export class DinamarcaComponent implements AfterViewInit{
  referidos: any;
  refeprueba: any;
  row: any;
  datosReferido: { id: string; datosReferido: any; }[];
  displayedColumns: string[] = [
    'agente',
    'nombre',
    'sitio',
    'depositoinicial',
    'recargas',
    'saldofinal',
    'puerto',
    'encargado',
    'estadodecuenta',
    'fechainicio',
    'fechafinal',
    'duracion'
  ];

  dataSource : MatTableDataSource <Transaction>;

  // nombre: any;
  puertos: string[] = ['Puerto 1', 'Puerto 2', 'Puerto 3', 'Puerto 4'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {
    this.dataService.getReferidos().subscribe(datosReferido => {
      this.referidos = datosReferido;
      this.dataSource = new MatTableDataSource(this.referidos);
      // console.log('Referidos: ', this.referidos);
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
