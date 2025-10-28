import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
listItems = [ 
  {name: 'Inicio', icon: 'home', route: '/dashboard'},
  {name: 'Estudiantes', icon: 'school', route: '/students'},
  {name: 'Cursos', icon: 'menu_book', route: '/courses'},
];  
}
