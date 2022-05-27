import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent implements OnInit {
  eventData;
  isEditing = false;
  editEventForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<EditEventDialogComponent>,
              private fb: FormBuilder) {
    this.eventData = data;
    this.editEventForm = this.fb.group({
      title: data.title,
      description: data.description
    })
  }

  ngOnInit(): void {
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onEditClick(): void {
    this.isEditing = true;

  }
  onDeleteClick(): void {

  }
}
