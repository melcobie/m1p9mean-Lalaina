import { ActionReducerMap } from "@ngrx/store";
import { userReducer } from "./user-reducer/reducer";
import { EKalyStore } from "./user-reducer/type";

export const rootReducer = {};

export interface AppState {
    userState: EKalyStore;
};


export const reducers: ActionReducerMap<AppState, any> = {
    userState: userReducer,
};