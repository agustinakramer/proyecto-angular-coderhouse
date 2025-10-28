import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../../../../core/services/models/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from '../../../../../core/services/students/student.service';

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {
 @Input() students: Student[] = [];

  displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'actions'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) {
    this.studentService.student$.subscribe((students) => {
      this.dataSource.data = students;
    });
  }

  OnCreateStudent() {
    this.studentService.clearEdit();
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.studentService.getStudents();
  }

  ngOnChanges() {
    if (this.students && this.students.length) {
      this.dataSource.data = this.students;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OnDeleteStudent(id: number) {
    this.studentService.deleteStudent(id);
  }

  OnEditStudent(id: number) {
    this.studentService.setUpdateStudent(id);
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

 }


