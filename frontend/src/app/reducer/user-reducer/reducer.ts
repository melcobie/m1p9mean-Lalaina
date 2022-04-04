
import * as EKalyAction from "./action";
import { type } from "./action";
import { EKalyStore } from "./type";
import { INIT } from "@ngrx/store";

export type Action = EKalyAction.All

const initialState : EKalyStore = {
    user: null,
    accessToken: "",
}



function reducer(state: EKalyStore = initialState, action: Action):EKalyStore{
    switch(action.type){
        case type.SIGNIN:
            return {
                ...state,
                ...action.payload,
            };
        case type.SIGNOUT:
            return {
                user: null,
                accessToken: "",
            };
        default:
            return state;
    }
}

export function userReducer(state: EKalyStore = initialState, action: Action):EKalyStore{
    if(action.type === INIT){
        let newState = localStorage.getItem("userState");
        state = newState? JSON.parse(newState) : initialState;
    }
    let result = reducer(state, action);
    localStorage.setItem("userState", JSON.stringify(result));
    console.log(action.type, result);
    return result;
}