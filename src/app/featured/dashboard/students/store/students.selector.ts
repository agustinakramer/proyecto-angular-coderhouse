import { createFeatureSelector, createSelector } from "@ngrx/store";
import { studentsFeatureKey, StudentsState } from "./students.reducer";

const selectStudentsState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectStudents = createSelector(selectStudentsState, (state: StudentsState) => state.students);

export const selectStudentsLoading = createSelector(selectStudentsState, (state: StudentsState) => state.isLoading);

export const selectStudentsError = createSelector(selectStudentsState, (state: StudentsState) => state.error);
