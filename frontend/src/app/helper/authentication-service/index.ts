import { Injectable } from "@angular/core";
import { Service } from "../api";
import { url } from "../url";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService{
    constructor(private service: Service){}

    signin = async (data:{
        username: string,
        password: string,
    }, cb: any, cbError:any) => {
        this.service.postWithoutToken(url.signin, data)
            .subscribe(
            (data: any)=>{
                cb(data);
            },
            (error: any)=>{
                cbError(error);
            }
        );  
    }

    signup = async (data:{
        username: string,
        password: string,
    }, cb: any, cbError: any) => {
        this.service.postWithoutToken(url.signup, data).subscribe(
            (data: any)=>{
                cb(data);
            },
            (err: any) =>{ 
                cbError(err);
            }
        )
    }

    logout = async (token: string, cb: any)=>{
        this.service.deleteData(url.logout, token)
            .subscribe(
                (data: any)=>{
                    cb(data);
                }
            )
    }
}