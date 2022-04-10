import { Action } from "@ngrx/store";

export const type = {
    SIGNIN : "SIGNIN",
    SIGNOUT: "SIGNOUT",
    ADD: "ADD",
    DELETE: "DELETE",
}

export class SigninAction implements Action{
    readonly type = type.SIGNIN;
    constructor(public payload: any){}
}

export class SignoutAction implements Action{
    readonly type = type.SIGNOUT;
    constructor(public payload: any){}
}

export class AddAction implements Action{
    readonly type = type.ADD;
    constructor(public payload: any){}
}

export class DeleteAction implements Action{
    readonly type = type.DELETE;
    constructor(public payload: any){}
}

export type All = 
    SigninAction
    | SignoutAction
    | AddAction
    | DeleteAction;
