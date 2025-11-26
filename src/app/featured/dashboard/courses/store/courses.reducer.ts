import { Course } from "../../../../core/services/models/Course";
import { coursesActions } from "./courses.actions";
import { createFeature, createReducer, on } from '@ngrx/store';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: any;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialCoursesState,
  on(coursesActions.loadCourses, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(coursesActions.loadCoursesSuccess, (state, { courses }) => {
    return {
      ...state,
      isLoading: false,
      courses,
    };
  }),
    on(coursesActions.loadCoursesFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error
    };
  })
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});