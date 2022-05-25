import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent implements OnInit {
  appointmentForm: FormGroup;
  alldayChecked = false;
  passedData;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<AddEventDialogComponent>,
              private fb: FormBuilder) {
    console.log(data);
    this.passedData = data;
    this.appointmentForm = this.fb.group({
      apptTitle: data.title,
      allDay: null,
      start: data.date,
      end: null,
      singleDay: data.date
    })
  }

  ngOnInit(): void {
  }
  onSaveClick(): void {
    this.dialogRef.close(this.appointmentForm.value);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  checkAllday(e): void {
    console.log(e);
    this.alldayChecked = e;
  }
}
