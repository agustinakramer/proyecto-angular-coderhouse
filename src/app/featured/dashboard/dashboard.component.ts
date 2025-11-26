import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCourses } from './courses/store/courses.selector';
import { selectStudents } from './students/store/students.selector';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  listItems = [
    {name: 'Inicio', icon: 'home', route: '/dashboard'},
    {name: 'Estudiantes', icon: 'school', route: '/students'},
    {name: 'Cursos', icon: 'menu_book', route: '/courses'},
  ];

  courses$: Observable<any[]>;
  students$: Observable<any[]>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectCourses);
    this.students$ = this.store.select(selectStudents);
  }
}
