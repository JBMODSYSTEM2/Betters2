import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule, MatDatepickerInputEvent  } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-apuesta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatIconModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, CommonModule, MatNativeDateModule, FormsModule ],
  templateUrl: './apuesta.component.html',
  styleUrl: './apuesta.component.css'
})
export class ApuestaComponent implements OnInit, OnDestroy {
  tablas: any[] = [];
  mostrarBoton = true;
  tiempoHastaMedianoche = '';
  tablaCreadaHoy = false; // Flag para controlar la creación de tablas
  fechaSeleccionada = new Date();
  fechasConTabla: { [fecha: string]: string } = {};

  private midnightCheckInterval: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.setupMidnightChecker();
  }

  ngOnDestroy(): void {
    if (this.midnightCheckInterval) {
      clearInterval(this.midnightCheckInterval);
    }
  }

  generarIDUnico(): string {
    return uuidv4(); // Generar un ID único usando uuidv4
  }

  setupMidnightChecker(): void {
    this.midnightCheckInterval = setInterval(() => {
      this.actualizarTiempoHastaMedianoche();
    }, 1000); // Revisa cada segundo
  }

  actualizarTiempoHastaMedianoche(): void {
    const ahora = new Date();
    const medianoche = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);
    const msHastaMedianoche = medianoche.getTime() - ahora.getTime();
    const segundos = Math.floor((msHastaMedianoche / 1000) % 60);
    const minutos = Math.floor((msHastaMedianoche / 1000 / 60) % 60);
    const horas = Math.floor(msHastaMedianoche / (1000 * 60 * 60));

    this.tiempoHastaMedianoche = `${horas}h ${minutos}m ${segundos}s`;

    // Cuando son exactamente las 00:00 y no se ha creado una tabla hoy
    if (ahora.getHours() === 0 && ahora.getMinutes() === 0 && !this.tablaCreadaHoy) {
      this.agregarTablaAutomatica();
      this.tablaCreadaHoy = true;  // Marcar que una tabla se ha creado hoy
    }

    // Restablecer el flag después de la medianoche
    if (ahora.getHours() !== 0 || ahora.getMinutes() !== 0) {
      this.tablaCreadaHoy = false;
    }
  }

  agregarTablaAutomatica(): void {
    const fechaActual = new Date();
    this.agregarTabla(fechaActual);
  }

  onFechaCambio(event: MatDatepickerInputEvent<Date>): void {
    const fechaSeleccionada = this.formatearFecha(this.fechaSeleccionada);
    const idTabla = this.fechasConTabla[fechaSeleccionada]; // Obtener ID de la tabla para la fecha seleccionada

    // Mostrar u ocultar la tabla correspondiente
    this.tablas.forEach(tabla => {
      tabla.mostrar = tabla.fecha === fechaSeleccionada;
    });

    // Mostrar el botón solo si no hay tabla para la fecha seleccionada
    this.mostrarBoton = !idTabla;
  }

  formatearFecha(fecha: Date): string {
    return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
  }

  agregarTabla(fecha: Date): void {
    const idTabla = this.generarIDUnico(); // Generar ID único para la tabla
    const fechaFormateada = this.formatearFecha(fecha);

    // Agregar tabla al arreglo de tablas
    this.tablas.push({
      id: idTabla,
      fecha: fechaFormateada,
      datos: [
        { cuenta: 'unibet', hora: '...', dato1: '...', dato2: '...' } // Datos predeterminados
      ]
    });

    // Relacionar la fecha con el ID de la tabla
    this.fechasConTabla[fechaFormateada] = idTabla;

    // Ocultar botón si se agregó una tabla
    this.mostrarBoton = false;
  }










  // myFilter = (d: Date | null): boolean => {
  //   const now = new Date();
  //   now.setHours(0, 0, 0, 0); // set current date time to 00:00:00

  //   // Prevent future dates from being selected.
  //   return d ? d <= now : false;
  // };

  inputValue?: string; // variable to store the input value

  formatInput(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    let value = target.value.replace(/[^0-9.]/g, ""); // remove non-digit and non-dot characters

    // Limit to 8 digits
    if (value.length > 15) {
      value = value.slice(0, 9);
    }

    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join(''); // remove extra dots
    }
    parts[0] = new Intl.NumberFormat('en-US').format(parseInt(parts[0])); // format number part with thousands separator
    target.value = parts.join('.');

    if (target.value === "NaN") {
      target.style.color = "transparent";
    } else {
      target.style.color = "initial";
    }

    this.inputValue = target.value; // store the input value

    if (event.key === "Enter") { // check if the pressed key was Enter
      // Assuming numberInput1 and numberInput2 are the ids of your input fields
      const input1 = parseFloat((<HTMLInputElement>document.getElementById('numberInput1')).value.replace(/,/g, ''));
      const input2 = parseFloat((<HTMLInputElement>document.getElementById('numberInput2')).value.replace(/,/g, ''));

      if (!isNaN(input1) && !isNaN(input2)) {
        console.log('Sum:', input1 + input2); // print the sum to the console
      }

      console.log(target.id,' :', this.inputValue); // print the input value to the console
      target.value = ''; // clear the input field
    }
  }

}
