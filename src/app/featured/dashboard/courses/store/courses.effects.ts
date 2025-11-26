import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesService } from "../../../../core/services/courses/courses.service";
import { coursesActions } from "./courses.actions";
import { catchError, concatMap, map, delay } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable()
export class CoursesEffects {

    constructor(private actions$: Actions, private coursesService: CoursesService) {
    this.loadCourses$ = createEffect(() =>
           this.actions$.pipe(
            ofType(coursesActions.loadCourses),
            concatMap(() =>
                this.coursesService.getCoursesForEffect().pipe(
                    delay(800),
                    map(courses => coursesActions.loadCoursesSuccess({ courses })),
                    catchError(error => of(coursesActions.loadCoursesFailure({ error })))
                )
            )
           )
        );
    }

    loadCourses$!: Observable<any>;
}
