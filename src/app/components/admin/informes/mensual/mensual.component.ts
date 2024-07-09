import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-mensual',
  standalone: true,
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  templateUrl: './mensual.component.html',
  styleUrl: './mensual.component.css'
})
export class MensualComponent {

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
