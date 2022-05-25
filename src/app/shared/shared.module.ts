import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChunkPipe} from './pipes/chunk.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [ChunkPipe, AddEventDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCheckboxModule
  ],
  exports: [
    ChunkPipe
  ]
})
export class SharedModule { }
