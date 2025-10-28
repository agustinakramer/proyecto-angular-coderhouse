import { Component } from '@angular/core';
import { Student } from '../../../core/services/models/Student';
import { StudentService } from '../../../core/services/students/student.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
students: Student[] = [];
studentToEdit: Student | null = null;
  constructor(private studentService: StudentService) {
  }

 onAddStudent(student: Student) {
       console.log('StudentsComponent - Received student:', student);
    this.studentService.addStudent(student);
    console.log('StudentsComponent - After adding to service');
    }

    onDeleteStudent(id: number) {
      this.studentService.deleteStudent(id);
    }

    onEditStudent(student: Student) {
      this.studentToEdit = student;
    } 

    onEditStudentRecieved(student: Student) {
      
      let response = this.studentService.updateStudent(student.id, student);
      if (response) {
        this.studentToEdit = null;
      }
    }
}


