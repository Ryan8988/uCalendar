import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, finalize, switchMap, tap} from "rxjs/operators";
import {MapService} from "../services/trimble.service";

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent implements OnInit {
  appointmentForm: FormGroup;
  alldayChecked = false;
  apptData;
  timeOptions;
  actionData;
  originalAppt;
  errorMessage;
  locationOptions;
  isLoading = false;
  location;
  @ViewChild('#map', { static: true }) mapElement: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<AddEventDialogComponent>,
              private fb: FormBuilder,
              private mapService: MapService) {
    console.log(data);
    this.actionData = data.action;
    this.apptData = data.appt;
    this.location = this.apptData.location;
    this.appointmentForm = this.fb.group({
      apptTitle: this.apptData.title,
      allDay: this.apptData.allDay || false,
      startDay: this.apptData.startDay || this.apptData.date,
      endDay: this.apptData.endDay,
      singleDay: this.apptData.date,
      startTime: this.apptData.startTime,
      endTime: this.apptData.endTime,
      description: this.apptData.description,
      location: this.apptData.location
    });
    this.timeOptions = this.getListofTimeslot();

  }

  ngOnInit(): void {
    this.appointmentForm.get('location').valueChanges
      .pipe(distinctUntilChanged())
      .pipe(
        debounceTime(500),
        tap(() => {
        this.errorMessage = '';
        this.locationOptions = [];
        this.isLoading = true;
        }),
        switchMap(value => this.mapService.singleSearch(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      ).subscribe( (resp: any) => {
        console.log(resp);
        if (resp.Locations.length !== 0) {
          this.locationOptions = resp.Locations;
        }
      });
  }

  displayFn(location): void {
    console.log(location);
    return location && location.ShortString ? location.ShortString : '';
  }
  onSaveClick(): void {
    this.dialogRef.close({
      toRemove: this.originalAppt,
      toAdd: this.appointmentForm.value
    });
  }
  onCancelClick(): void {
    this.originalAppt = {};
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
    return res;
  }
  onEditClick(apptData): void {
    this.actionData = 'add';
    console.log(apptData);
    this.alldayChecked = this.appointmentForm.get('allDay').value;
    this.originalAppt = apptData;
  }
  onDeleteClick(): void {

  }

}
