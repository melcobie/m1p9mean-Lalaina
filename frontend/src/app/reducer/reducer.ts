
import * as EKalyAction from "./action";
import { type } from "./action";
import { EKalyStore } from "./type";

export type Action = EKalyAction.All

const initialState : EKalyStore = {
    user: null,
    token: "",
}



export function userReducer(state: EKalyStore = initialState, action: Action):EKalyStore{
    console.log(action.type, state);

    switch(action.type){
        case type.SIGNIN:
            return {
                ...state,
                user: action.payload,
            };
        case type.SIGNOUT:
            return {
                user: null,
                token: "",
            };
        default:
            return state;
    }
}