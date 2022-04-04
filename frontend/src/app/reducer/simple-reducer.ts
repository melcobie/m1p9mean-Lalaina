import { Action } from "@ngrx/store";
import { type } from "./user-reducer/action";


export function simplereducer(state: string = "Hello World", action: Action){
    console.log(action.type, state);

    switch(action.type){
        case type.SIGNIN:
            return state = "Sign in";
        // case type.SIGNOUT:
        //     return {
        //         user: null,
        //         token: "",
        //     };
        default:
            return state;
    }
}