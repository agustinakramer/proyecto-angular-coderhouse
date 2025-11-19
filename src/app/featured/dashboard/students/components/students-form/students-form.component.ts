import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../../../core/services/models/Student';
import { StudentService } from '../../../../../core/services/students/student.service';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { Course } from '../../../../../core/services/models/Course';
import { formGroup } from './validators';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.css'
})
export class StudentsFormComponent {

  userForm: FormGroup;
  studentId: number | null = null;
  isEditing = false;
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.userForm = this.fb.group(formGroup);

    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = Number(params['id']);
        this.studentId = id;
        this.isEditing = true;
        this.studentService.getStudent(id).subscribe(student => {
          if (student) {
            this.userForm.patchValue({
              id: student.id,
              name: student.name,
              lastName: student.lastName,
              email: student.email,
              course: student.course
            });
          }
        });
      } else {
        this.isEditing = false;
        this.userForm.reset();
      }
    });

    this.coursesService.courses$.subscribe(c => this.courses = c);
  }

  OnSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const payload = this.userForm.value as Student;
    if (this.isEditing) {
      this.studentService.updateStudent(payload);
    } else {
      this.studentService.addStudent(payload);
    }

    this.userForm.reset();
    this.isEditing = false;
    this.router.navigate(['dashboard', 'students']);
  }

  inputValid(inputName: 'name' | 'lastName' | 'email' | 'course') {
    return this.userForm.get(inputName)?.valid && this.userForm.get(inputName)?.touched;
  }

  inputInvalid(inputName: 'name' | 'lastName' | 'email' | 'course') {
    return (
      this.userForm.get(inputName)?.invalid &&
      this.userForm.get(inputName)?.touched &&
      this.userForm.get(inputName)?.dirty
    );
  }

  getError(inputName: 'name' | 'lastName' | 'email' | 'course') {
    if (!this.userForm.get(inputName)?.errors) {
      return null;
    }

    const errors = Object.keys(this.userForm.get(inputName)?.errors as string[]);

    if (errors.length === 0) {
      return null;
    }

    let message = '';

    errors.forEach((error) => {
      switch (error) {
        case 'required':
          message += 'Este campo es requerido';
          break;
        case 'minlength':
          message += 'Este campo debe tener al menos 3 caracteres';
          break;
        default:
          break;
      }
    });

    return message;
  }

}
