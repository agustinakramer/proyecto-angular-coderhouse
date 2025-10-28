import { V } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../../../core/services/models/Student';
import { StudentService } from '../../../../../core/services/students/student.service';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { Course } from '../../../../../core/services/models/Course';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.css'
})
export class StudentsFormComponent {

  public userForm: FormGroup;
  isEditing: boolean = false;
  courses: Course[] = [];

  constructor(private fb: FormBuilder, private studentService: StudentService, private coursesService: CoursesService, private router: Router, private route: ActivatedRoute) { 
    this.userForm = this.fb.group({
    id: [''],
    name: [ '', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    course: ['', [Validators.required]]
  });

  this.studentService.studentEdit$.subscribe(student => {
    if (student) {
      this.isEditing = true;
      this.userForm.patchValue({
        id: student.id,
        name: student.name,
        lastName: student.lastName,
        email: student.email,
        course: student.course
      });
    } else {
      this.isEditing = false;
      this.userForm.reset();
    }
  });

  this.route.params.subscribe(params => {
    if (params['id']) {
      const id = Number(params['id']);
      this.studentService.setUpdateStudent(id);
    }
  });

  this.coursesService.courses$.subscribe(c => {
    this.courses = c;
  });

}

ngOnChanges() {
   
  }

  OnSubmit() {
    if (this.userForm.invalid) {
      console.log("Formulario no válido");
      return;
    }

    console.log('Form data being sent:', this.userForm.value);
    if (this.isEditing) {
      this.studentService.updateStudent(this.userForm.value.id, this.userForm.value);
    } else {
      this.studentService.addStudent(this.userForm.value);
    }
  this.userForm.reset();
  this.isEditing = false;
  this.router.navigate(['dashboard', 'students']);

  }
  
}
