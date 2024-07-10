import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceAdmin } from '../../admin/data.serviceadmin';
import { Referido, Ejecutor } from '../../../model/model.module';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatPaginator
  ],
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Referido>([]);
  ejecutores: Ejecutor[] = [];
  columnasMostradas = ['referido', 'nombreCasaDeApuestas', 'puertos', 'ejecutor', 'acciones'];

  constructor(
    private dataService: DataServiceAdmin,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  datosOriginales: Referido[] = [];
  datosTransformados: any[] = [];
  puertos = [1, 2, 3];

  ngOnInit() {
    // this.cargarReferidos();
    this.cargarEjecutores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // cargarReferidos() {
  //   this.dataService.getReferidos().subscribe(data => {
  //     this.datosOriginales = data;
  //     this.transformarDatos();
  //     this.dataSource.data = this.datosTransformados;
  //   });
  // }

  cargarEjecutores() {
    this.dataService.getEjecutores().subscribe(data => {
      this.ejecutores = data;
    });
  }

  // transformarDatos() {
  //   this.datosTransformados = [];
  //   this.datosOriginales.forEach(elemento => {
  //     elemento.casasDeApuestas.forEach(casa => {
  //       this.datosTransformados.push({
  //         referido: elemento.nombre,
  //         nombreCasaDeApuestas: casa.nombre,
  //         ejecutorId: elemento.ejecutorId,
  //         casasDeApuestas: elemento.casasDeApuestas,
  //         puertoSeleccionado: casa.puertoSeleccionado,
  //       });
  //     });
  //   });
  //   this.cdr.detectChanges();
  //   this.paginator.pageSize = this.datosTransformados.length;
  // }

  aplicarFiltro(event: Event) {
    const filtroValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  }

  asignarEjecutor(elemento: any, ejecutorId: string) {
    this.dataService.asignarEjecutorAReferido(elemento.referidoId, ejecutorId).then(() => {
      elemento.ejecutorId = ejecutorId;
      this.snackBar.open('Ejecutor asignado', 'Cerrar', {
        duration: 2000,
        panelClass: ['custom-snackbar']
      });
    });
  }

  trackByPuerto(index: number, item: any): number {
    return item;
  }

  editar(elemento: any) {
    // Lógica de edición
  }

  guardar(elemento: any) {
    if (elemento.puertoSeleccionado) {
      this.snackBar.open('Dato registrado', 'Cerrar', {
        duration: 2000,
        panelClass: ['custom-snackbar']
      });
    }
  }

  eliminar(elemento: any) {
    elemento.puertoSeleccionado = null;
    elemento.ejecutor = '';
  }
}
