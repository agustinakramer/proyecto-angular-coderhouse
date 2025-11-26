import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Course, courseColumns } from '../../../../../core/services/models/Course';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { Rootstate } from '../../../../../core/store';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCourses, selectCoursesError, selectCoursesLoading } from '../../store/courses.selector';
import { coursesActions } from '../../store/courses.actions';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {
 displayedColumns: string[] = ['id', 'name', 'description', 'beginDate', 'endDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  course$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  private destroy$ = new Subject<void>();

  constructor(private courseService: CoursesService, private store: Store<Rootstate>) {
    this.course$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit() {
    this.store.dispatch(coursesActions.loadCourses());

    this.course$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (courses) => {
        this.dataSource.data = courses;
      },
      error: (err) => {
        console.error('Error loading courses in CoursesListComponent:', err);
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

  onDeleteCourse(id: number) {
    this.courseService.deleteCourse(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
