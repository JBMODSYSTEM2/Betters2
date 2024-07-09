import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
// import { DialogoComponent } from './dialogo.component';

interface Referido {
  referido: string;
  casasDeApuestas: CasaDeApuestas[];
}

interface CasaDeApuestas {
  nombre: string;
  puertoSeleccionado?: number;
  ejecutor?: string;
}


@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule,
    MatSelectModule, MatTableModule, MatIconModule, MatPaginatorModule,
    MatInputModule, MatPaginator],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export class AsignacionComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>([]); // Usa MatTableDataSource para manejar la fuente de datos de tu tabla

  constructor(
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  datosOriginales: Referido[] = [
    {
      referido: 'Referido 1',
      casasDeApuestas: [
        { nombre: 'Casa de apuestas 1' },
        { nombre: 'Casa de apuestas 2' },
        { nombre: 'Casa de apuestas 3' }
      ]
    },
    {
      referido: 'Referido 2',
      casasDeApuestas: [
        { nombre: 'Casa de apuestas 1' },
        { nombre: 'Casa de apuestas 3' }
      ]
    },
    {
      referido: 'Referido 3',
      casasDeApuestas: [
        { nombre: 'Casa de apuestas 2' },
        { nombre: 'Casa de apuestas 12' },
        { nombre: 'Casa de apuestas 6' },
        { nombre: 'Casa de apuestas 3' }
      ]
    }
    // Tus datos originales aquí...
  ];

  datosTransformados: any[] = [];
  columnasMostradas = ['referido', 'nombreCasaDeApuestas', 'puertos', 'ejecutor', 'acciones'];
  puertos = [1, 2, 3];

  ngOnInit() {
    // this.transformarDatos();
    this.dataSource.paginator = this.paginator; // Asigna el paginador a tu dataSource
  }

  transformarDatos() {
    this.datosTransformados = []; // Asegurando reinicio
    this.datosOriginales.forEach(elemento => {
      elemento.casasDeApuestas.forEach(casa => {
        this.datosTransformados.push({
          referido: elemento.referido,
          nombreCasaDeApuestas: casa.nombre,
        });
      });
    });
    this.dataSource.data = this.datosTransformados; // Asigna los datos transformados a dataSource.data
    this.cdr.detectChanges();
    // Ajusta el tamaño de página del paginador
    const totalCasas = this.calcularTotalCasasDeApuestas(this.datosTransformados);


    this.paginator.pageSize = totalCasas; // Ajusta el tamaño de página basado en el total de casas de apuestas
  }

  aplicarFiltro(event: Event) {
    const filtroValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  }

  asignarEjecutor(elemento: any) {
    const ejecutores = ['Lucas Beltrán', 'Rodolfo Beltrán', 'Edwin Beltrán'];
    elemento.ejecutor = ejecutores[elemento.puertoSeleccionado - 1];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator = this.paginator;
    this.transformarDatos(); // Asegúrate de llamar a transformarDatos aquí para que se configure después de que el paginador esté listo
  }

  calcularTotalCasasDeApuestas(datos: any[]): number {
    if (!datos) {
      return 0;
    }

    return datos.reduce((acumulador, datoActual) => {
      if (datoActual && datoActual.casasDeApuestas) {
        return acumulador + datoActual.casasDeApuestas.length;
      } else {
        return acumulador;
      }
    }, 0);
  }

  trackByPuerto(index: number, item: any): number {
    return item; // Aquí asumimos que 'item' es un número (el puerto). Si no es un número, puedes necesitar una propiedad única del item.
  }

  editar(elemento: any) {
    // Lógica de edición
  }

  guardar(elemento: any) {
    if (elemento.puertoSeleccionado) {
      // ... tu código para guardar el dato aquí ...

      this.snackBar.open('Dato registrado', 'Cerrar', {
        duration: 2000,
        panelClass: ['custom-snackbar']
      });
    }
  }

  eliminar(elemento: any) {
    // Lógica de eliminación
    elemento.puertoSeleccionado = null;
    elemento.ejecutor = '';
  }

}
