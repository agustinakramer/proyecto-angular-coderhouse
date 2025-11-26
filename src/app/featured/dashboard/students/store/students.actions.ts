import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Student } from "../../../../core/services/models/Student";

export const studentsActions = createActionGroup({
  source: '[Students] Students Actions',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: any }>()
  }
});
