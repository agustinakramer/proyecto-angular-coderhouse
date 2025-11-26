import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "../../../../core/services/students/student.service";
import { studentsActions } from "./students.actions";
import { catchError, concatMap, map, delay } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable()
export class StudentsEffects {
    constructor(private actions$: Actions, private studentService: StudentService) {
        this.loadStudents$ = createEffect(() =>
            this.actions$.pipe(
                ofType(studentsActions.loadStudents),
                concatMap(() =>
                    this.studentService.getStudentsForEffect().pipe(
                        delay(800),
                        map(students => studentsActions.loadStudentsSuccess({ students })),
                        catchError(error => of(studentsActions.loadStudentsFailure({ error })))
                    )
                )
            )
        );
    }

    loadStudents$!: Observable<any>;
}
