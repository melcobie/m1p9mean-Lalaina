
import * as EKalyAction from "./action";
import { type } from "./action";
import { EKalyStore } from "./type";
import { INIT } from "@ngrx/store";

export type Action = EKalyAction.All

export const initialState : EKalyStore = {
    user: null,
    accessToken: "",
    commande: {
        plats: [],
        price: 0,
        costPrice: 0,
    },
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
                commande: {
                    plats: [],
                    price: 0,
                    costPrice: 0,
                },
            };
        case type.ADD:
            return {
                ...state,
                commande: action.payload,
            };
        case type.DELETE:
            return {
                ...state,
                commande: {
                    plats: [],
                    price: 0,
                    costPrice: 0,
                },
            }
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