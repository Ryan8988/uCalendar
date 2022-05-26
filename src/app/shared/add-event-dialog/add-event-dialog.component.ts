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
  timeOptions;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<AddEventDialogComponent>,
              private fb: FormBuilder) {
    console.log(data);
    this.passedData = data;
    this.appointmentForm = this.fb.group({
      apptTitle: data.title,
      allDay: false,
      startDay: data.date,
      endDay: null,
      singleDay: data.date,
      startTime: null,
      endTime: null,
      description: null
    });
    this.timeOptions = this.getListofTimeslot();
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

  getListofTimeslot(): Array<string> {
    const res = [];
    const date = new Date();
    for (let i = 0; i < 24 * 60; i = i + 15) {
      date.setHours(0);
      date.setMinutes(i);
      res.push(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
    }
    console.log(res);
    return res;
  }
}
