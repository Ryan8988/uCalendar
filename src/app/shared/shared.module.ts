import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChunkPipe} from './pipes/chunk.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [ChunkPipe, AddEventDialogComponent, EditEventDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatIconModule
  ],
  exports: [
    ChunkPipe
  ]
})
export class SharedModule { }
