import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentSubject = new BehaviorSubject<Student[]>([]);
  student$ = this.studentSubject.asObservable();

  private studentEdit = new BehaviorSubject<Student | null>(null);
  studentEdit$ = this.studentEdit.asObservable();

  private studentsUrl = `${API_URL}/students`;

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  getStudents() {
    this.http.get<Student[]>(this.studentsUrl).subscribe(students => {
      this.students = students;
      this.studentSubject.next(students);
    });
  }

  getStudent(id: number) {
    return this.http.get<Student>(`${this.studentsUrl}/${id}`);
  }

  addStudent(student: Student) {
    const newId = String(Number(this.students[this.students.length - 1].id) + 1);
    student.id = newId;
    this.http.post<Student>(this.studentsUrl, student).subscribe(addedStudent => {
      this.students.push(addedStudent);
      this.studentSubject.next(this.students);
    });
  }

  updateStudent(student: Student) {
    this.http.put<Student>(`${this.studentsUrl}/${student.id}`, student).subscribe(updatedStudent => {
      const updatedStudents = this.students.map(s => (s.id === updatedStudent.id ? updatedStudent : s));
      this.studentSubject.next(updatedStudents);
    });
  }

  deleteStudent(id: number) {
    this.http.delete(`${this.studentsUrl}/${id}`).subscribe(() => {
      const updatedStudents = this.students.filter(s => s.id !== id);
      this.studentSubject.next(updatedStudents);
    });
  }
}
