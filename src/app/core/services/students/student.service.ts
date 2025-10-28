import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/Student';
import { STUDENTS_MOCK } from './data/mock';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private userSubject = new BehaviorSubject<Student[]>([...STUDENTS_MOCK]);
  student$ = this.userSubject.asObservable();

  private studentEdit = new BehaviorSubject<Student | null>(null);
  studentEdit$ = this.studentEdit.asObservable();

  private students: Student[] = [...STUDENTS_MOCK];

  getStudents(): Observable<Student[]> {
    return this.student$;
  }

  addStudent(student: Partial<Student>) {
    console.log('StudentService - Adding student:', student);
    const newId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    const newStudent: Student = { ...(student as Student), id: newId };
    this.students.push(newStudent);
    this.userSubject.next([...this.students]);
    console.log('StudentService - Emitted new list');
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    this.userSubject.next([...this.students]);
  }

  setUpdateStudent(id: number) {
    const student = this.students.find(s => s.id === id) || null;
    this.studentEdit.next(student);
  }

  clearEdit() {
    this.studentEdit.next(null);
  }

  updateStudent(id: number, data: Student): boolean {
    const idx = this.students.findIndex(s => s.id === id);
    if (idx === -1) return false;
    this.students[idx] = { ...data, id };
    this.userSubject.next([...this.students]);
    return true;
  }
}
