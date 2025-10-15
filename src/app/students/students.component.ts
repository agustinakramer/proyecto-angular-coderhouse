import { Component } from '@angular/core';
import { Student } from './models/Student';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
students: Student[] = [
  {id: 1, name: 'Juan', lastName: 'Perez', email: 'juan.perez@example.com', course: 'Matemáticas'},
  {id: 2, name: 'Maria', lastName: 'Gomez', email: 'maria.gomez@example.com', course: 'Historia'},
  {id: 3, name: 'Pedro', lastName: 'Lopez', email: 'pedro.lopez@example.com', course: 'Ciencias'}
]; 

onAddStudent(student: Student) {
  console.log('Adding student:', student);
  console.log('Before push - students length:', this.students.length);
  
  const newStudent = {...student, id: this.students.length > 0 ? this.students[this.students.length - 1].id + 1 : 1};
  this.students = [...this.students, newStudent]; // Crear nueva referencia del array
  
  console.log('After push - students length:', this.students.length);
  console.log('New students array:', this.students);
}


}


