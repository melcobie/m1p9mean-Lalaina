import { Action } from "@ngrx/store";

export const type = {
    SIGNIN : "SIGNIN",
    SIGNOUT: "SIGNOUT"
}

export class SigninAction implements Action{
    readonly type = type.SIGNIN;
    constructor(public payload: any){}
}

export class SignoutAction implements Action{
    readonly type = type.SIGNOUT;
    constructor(public payload: any){}
}

export type All = 
    SigninAction
    | SignoutAction;
