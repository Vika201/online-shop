import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
    
    // створюється форма для заповнення (реактивна), в якій вказуюьбся значення
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    year: new FormControl(''),
    chip: new FormControl(''),
    ssd: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl(''),
  }) 

  onNoClick(): void {

    this.dialogRef.close();
  }

  onSubmit() { 
    // коли закриється вікно ми передаємо ці дані на сервер
    this.data = {
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd, 
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    }
    console.log(this.data)
    this.dialogRef.close(this.data);

  }
}
