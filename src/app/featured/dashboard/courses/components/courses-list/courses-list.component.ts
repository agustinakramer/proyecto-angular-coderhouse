import { Component, ViewChild } from '@angular/core';
import { Course, courseColumns } from '../../../../../core/services/models/Course';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../../core/services/courses/courses.service';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent {
 displayedColumns: string[] = ['id', 'name', 'description', 'beginDate', 'endDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private courseService: CoursesService) {
    this.courseService.courses$.subscribe((courses) => {
      console.log('CoursesListComponent - received courses', courses && courses.length ? courses.length : 0);
      this.dataSource.data = courses;
    });
  }

  ngOnInit() {
    this.courseService.getCourses();
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
