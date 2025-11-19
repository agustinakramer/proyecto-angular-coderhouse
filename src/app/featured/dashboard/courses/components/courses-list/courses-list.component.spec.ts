import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../../../../../core/services/courses/courses.service';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [
        { provide: CoursesService, useValue: { courses$: of([]), getCourses: () => {}, deleteCourse: (id: number) => {} } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
