import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { Student } from './models/Student';
import { MatTab } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FullNamePipe } from '../pipes/full-name.pipe';
import { MatIcon, MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsFormComponent,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    StudentsComponent,
     StudentsListComponent,
    StudentsFormComponent 
  ]
})
export class StudentsModule {
 }
