import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-agenteapuestas',
  standalone: true,
  imports: [ MatIcon],
  templateUrl: './agenteapuestas.component.html',
  styleUrl: './agenteapuestas.component.css'
})
export class AgenteapuestasComponent {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


}

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

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

      if (!isNaN(input1)) {
        console.log('Sum:', input1); // print the sum to the console
      }

      console.log(target.id,' :', this.inputValue); // print the input value to the console
      target.value = ''; // clear the input field
    }
  }
}
