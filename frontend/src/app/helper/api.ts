import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn : "root"
})
export class Service{
    baseUrl = "http://localhost:3000/api";
    headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    constructor(private http: HttpClient){}

    headerWithToken = (token:string) => {
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": "Bearer "+ token,
        }
    }

    postWithoutToken = (url: string, data: any) => {
        const result = this.http.post(
            this.baseUrl + url,
            data,
            { headers : this.headers },
        );
        return result;
    };

    getWithoutToken = (url: string, data?: any) => {
        let httpParams = new HttpParams()
        Object.keys(data)?.map((key)=>httpParams.set(key, data[key]));
        const result = this.http.get(
            this.baseUrl + url,
            { 
                headers : this.headers,
                params : httpParams,
            },
        );
        return result;
    };

    postData = (url: string, token:string, data: any) => {
        const result = this.http.post(
            this.baseUrl + url,
            data,
            { headers : this.headerWithToken(token) },
        );
        return result;
    };

    getData = (url: string, token:string, data?: any) => {
        let httpParams = new HttpParams()
        Object.keys(data)?.map((key)=>httpParams.set(key, data[key]));
        const result = this.http.get(
            this.baseUrl + url,
            { 
                headers : this.headerWithToken(token),
                params : httpParams,
            },
        );
        return result;
    };

    putData = (url:string, token:string, data:any) => {
        const result = this.http.put(
            this.baseUrl + url,
            data,
            {
                headers: this.headerWithToken(token)
            }
        );
        return result;
    }

    deleteData = (url:string, token:string) => {
        const result = this.http.delete(
            this.baseUrl + url,
            {
                headers: this.headerWithToken(token)
            }
        );
        return result;
    }
}
