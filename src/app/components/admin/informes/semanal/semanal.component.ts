import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-semanal',
  providers: [ provideNativeDateAdapter()],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  templateUrl: './semanal.component.html',
  styleUrl: './semanal.component.css'
})
export class SemanalComponent {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const now = new Date();
    now.setHours(0, 0, 0, 1); // set current date time to 00:00:00

    // Allow only Tuesday to be selected and date is not in the future.
    return day === 2 && (!d || d <= now);
  };

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
