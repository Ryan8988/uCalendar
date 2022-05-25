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
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<AddEventDialogComponent>,
              private fb: FormBuilder) {
    console.log(data);
    this.appointmentForm = this.fb.group({
      apptTitle: data.title,
      allDay: null
    })
  }

  ngOnInit(): void {
  }
  onSaveClick(): void {
    this.dialogRef.close(this.appointmentForm);
  }
  onCancelClick(): void {

  }
  checkAllday(e): void {
    console.log(e);
  }
}
