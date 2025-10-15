import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from '../../models/Student';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnChanges {
 @Input() students: Student[] = [];

 displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'actions'];
 dataSource = new MatTableDataSource<Student>();

 ngOnInit() {
   console.log('Initial students:', this.students);
   this.dataSource.data = this.students;
 }

 ngOnChanges(changes: SimpleChanges) {
   console.log('ngOnChanges triggered:', changes);
   if (changes['students']) {
     console.log('Students changed - old:', changes['students'].previousValue);
     console.log('Students changed - new:', changes['students'].currentValue);
     this.dataSource.data = [...this.students];
   }
 }

 deleteStudent(id: number) {
    // Filtra el alumno eliminado y actualiza el dataSource
    this.students = this.students.filter(s => s.id !== id);
    this.dataSource.data = this.students;
  }
}
