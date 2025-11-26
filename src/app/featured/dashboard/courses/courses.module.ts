import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CoursesFormComponent],
  imports: [CommonModule, SharedModule, CoursesRoutingModule, StoreModule.forFeature(coursesFeature), EffectsModule.forFeature([CoursesEffects])],
  exports: [CoursesComponent, CoursesListComponent, CoursesFormComponent]
})
export class CoursesModule {}
