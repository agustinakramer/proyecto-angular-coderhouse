import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Student } from '../../../../../core/services/models/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from '../../../../../core/services/students/student.service';
import { Rootstate } from '../../../../../core/store';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectStudents, selectStudentsError, selectStudentsLoading } from '../../store/students.selector';
import { studentsActions } from '../../store/students.actions';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  student$: Observable<Student[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  private destroy$ = new Subject<void>();

  constructor(private studentService: StudentService, private store: Store<Rootstate>) {
    this.student$ = this.store.select(selectStudents);
    this.isLoading$ = this.store.select(selectStudentsLoading);
    this.error$ = this.store.select(selectStudentsError);
  }

  ngOnInit() {
    this.store.dispatch(studentsActions.loadStudents());

    this.student$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (students) => {
        this.dataSource.data = students as any;
      },
      error: (err) => {
        console.error('Error loading students in StudentsListComponent:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteStudent(id: number) {
    this.studentService.deleteStudent(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


