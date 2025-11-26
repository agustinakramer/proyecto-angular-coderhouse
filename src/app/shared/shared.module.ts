import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HighlightDirective } from '../directives/highlight.directive';
import { TitleStylingDirective } from '../directives/title-styling.directive';
import { FullNamePipe } from '../pipes/full-name.pipe';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';

const MATERIAL = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatCardModule
];

@NgModule({
  declarations: [
    HighlightDirective,
    TitleStylingDirective,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MATERIAL
  ],
  exports: [
    HighlightDirective,
    TitleStylingDirective,
    FullNamePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CdkLayoutModule,
    ...MATERIAL
  ]
})
export class SharedModule {}
