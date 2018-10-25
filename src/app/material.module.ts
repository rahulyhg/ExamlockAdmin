import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from  '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  // MatTabChangeEvent
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    CommonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    // MatTabChangeEvent,
    MatProgressSpinnerModule
  ],
  // providers: [MatTabChangeEvent,],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    // MatTabChangeEvent,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}