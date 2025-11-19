import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, authReducer, AuthState } from "./auth/auth.reducer";

export interface Rootstate {
    [authFeatureKey]: AuthState;
}

export const rootReducer: ActionReducerMap<Rootstate> = {
    [authFeatureKey]: authReducer
};