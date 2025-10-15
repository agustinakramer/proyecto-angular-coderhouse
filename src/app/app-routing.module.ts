import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students/components/students-list/students-list.component';
import { StudentsFormComponent } from './students/components/students-form/students-form.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: 'estudiantes', component: StudentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
