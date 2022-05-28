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
import {MatIconModule} from '@angular/material/icon';
import { TrimbleMapsComponent } from './trimble-maps/trimble-maps.component';
import {MapService} from './services/trimble.service';
import {HttpClientModule} from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [ChunkPipe, AddEventDialogComponent, TrimbleMapsComponent],
  providers: [MapService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatIconModule, MatAutocompleteModule
  ],
  exports: [
    ChunkPipe,
  ]
})
export class SharedModule { }
