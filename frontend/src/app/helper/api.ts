import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn : "root"
})
export class Service{
    baseUrlProd = "";
    baseUrl = "";
    headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    constructor(private http: HttpClient){
        // //prod
        // this.baseUrlProd = "https://m1p9mean-lalaina.herokuapp.com/api"; 
        this.baseUrl = this.baseUrlProd !== ""? this.baseUrlProd : "http://localhost:3000/api";
    }

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
        const result = this.http.get(
            this.baseUrl + url,
            { 
                headers : this.headers,
                params : data,
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

    postFormData = (url: string, token: string, data: any) => {
        const formData = new FormData();
        Object.keys(data)?.map((key)=>{
            formData.append(key, data[key])
        })
        const result = this.http.post(
            this.baseUrl + url,
            formData,
            {
                headers: {
                    
                    Accept: "application/json",
                    "Authorization": "Bearer "+ token,
                },     
            }
        );
        return result;
    }

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

    deleteData = (url:string, token:string, data:any={}) => {
        const result = this.http.delete(
            this.baseUrl + url,
            {
                headers: this.headerWithToken(token),
                body: data,
            }
        );
        return result;
    }
}
