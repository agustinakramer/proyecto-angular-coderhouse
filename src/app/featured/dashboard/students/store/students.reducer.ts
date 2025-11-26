import { Student } from "../../../../core/services/models/Student";
import { studentsActions } from "./students.actions";
import { createFeature, createReducer, on } from '@ngrx/store';

export const studentsFeatureKey = 'students';

export interface StudentsState {
  students: Student[];
  isLoading: boolean;
  error: any;
}

export const initialStudentsState: StudentsState = {
  students: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialStudentsState,
  on(studentsActions.loadStudents, (state) => ({ ...state, isLoading: true })),
  on(studentsActions.loadStudentsSuccess, (state, { students }) => ({ ...state, isLoading: false, students })),
  on(studentsActions.loadStudentsFailure, (state, { error }) => ({ ...state, isLoading: false, error }))
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});
