import { createAction, props } from "@ngrx/store";

export const setAuthUser = createAction('[Auth] Set Auth User',
    props<{ payload: any }>()
);

export const clearAuthUser = createAction('[Auth] Clear Auth User');