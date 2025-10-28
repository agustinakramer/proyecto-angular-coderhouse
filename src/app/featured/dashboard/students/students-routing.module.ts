import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsModule } from './students.module';
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      { path: '', component: StudentsListComponent },
      { path: 'create', component: StudentsFormComponent },
      { path: 'edit/:id', component: StudentsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
