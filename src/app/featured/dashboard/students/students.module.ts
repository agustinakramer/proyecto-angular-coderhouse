import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';

import { SharedModule } from '../../../shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StoreModule } from '@ngrx/store';
import { studentsFeature } from './store/students.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './store/students.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
  MatProgressSpinnerModule,
    StoreModule.forFeature(studentsFeature),
    EffectsModule.forFeature([StudentsEffects])
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
