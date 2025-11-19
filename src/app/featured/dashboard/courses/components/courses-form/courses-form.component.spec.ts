import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CoursesFormComponent } from './courses-form.component';
import { CoursesService } from '../../../../../core/services/courses/courses.service';

describe('CoursesFormComponent', () => {
  let component: CoursesFormComponent;
  let fixture: ComponentFixture<CoursesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
      declarations: [CoursesFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        { provide: CoursesService, useValue: { getCourse: (id: number) => of(null), addCourse: () => {}, updateCourse: () => {}, courses$: of([]) } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
