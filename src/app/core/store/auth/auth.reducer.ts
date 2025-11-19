import { createReducer, on } from "@ngrx/store";
import { clearAuthUser, setAuthUser } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any | null;
}

export const initialAuthState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(setAuthUser, (state, { payload }) => ({
    ...state,
    user: payload
  })),
  on(clearAuthUser, state => ({
    ...state,
    user: null
  }))
);