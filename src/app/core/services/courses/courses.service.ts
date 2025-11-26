import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { MOCK_COURSES } from './data/mock';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];
  private courseSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.courseSubject.asObservable();

  private coursesUrl = `${API_URL}/courses`;

  constructor(private httpClient: HttpClient) {
    this.getCourses();
  }

  getCoursesForEffect() {
    return this.httpClient.get<Course[]>(this.coursesUrl);
  }

  getCourses() {
    this.httpClient.get<Course[]>(this.coursesUrl).subscribe(courses => {
      this.courses = courses;
      this.courseSubject.next(courses);
    });
  }

  getCourse(id: number) {
    return this.httpClient.get<Course>(`${this.coursesUrl}/${id}`);
  }

  addCourse(course: Course) {
    const newId = String(Number(this.courses[this.courses.length - 1].id) + 1);
    course.id = newId;
    this.httpClient.post<Course>(this.coursesUrl, course).subscribe(addedCourse => {
      this.courses.push(addedCourse);
      this.courseSubject.next(this.courses);
    });
  }

  updateCourse(course: Course) {
    this.httpClient.put<Course>(`${this.coursesUrl}/${course.id}`, course).subscribe(updatedCourse => {
      const updatedCourses = this.courses.map(c => (c.id === updatedCourse.id ? updatedCourse : c));
      this.courseSubject.next(updatedCourses);
    });
  }
  deleteCourse(id: number) {
    this.httpClient.delete(`${this.coursesUrl}/${id}`).subscribe(() => {
      const updatedCourses = this.courses.filter(c => c.id !== id);
      this.courseSubject.next(updatedCourses);
    });
  }
}
