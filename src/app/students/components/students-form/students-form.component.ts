import { V } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/Student';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.css'
})
export class StudentsFormComponent {

  public userForm: FormGroup;
  @Output() sendStudent = new EventEmitter<Student>();

  constructor(private fb: FormBuilder) { 
    this.userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    course: ['', [Validators.required]]
  });
  }
  
  OnSubmit() {
    if (this.userForm.invalid) {
      console.log("Formulario no válido");
      return;
    }
    this.sendStudent.emit(this.userForm.value);

  }
  
}
