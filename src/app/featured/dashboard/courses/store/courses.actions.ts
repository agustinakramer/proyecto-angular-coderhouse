import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course } from "../../../../core/services/models/Course";

export const coursesActions = createActionGroup({
  source: '[Courses] Courses Actions',
  events: { 
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: any }>()
  }
});