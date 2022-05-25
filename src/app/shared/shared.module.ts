import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChunkPipe} from './pipes/chunk.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';



@NgModule({
  declarations: [ChunkPipe, AddEventDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ChunkPipe
  ]
})
export class SharedModule { }
