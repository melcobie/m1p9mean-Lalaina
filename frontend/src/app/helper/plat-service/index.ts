import { Injectable } from "@angular/core";
import { Service } from "../api";
import { url } from "../url";

@Injectable({
    providedIn: "root"
})
export class PlatService{
    constructor(private service: Service){}

    getPlats = (data: any, token: string)=>{
        return this.service.postData(
            url.plats.get,
            token,
            data,
        );
    }

    createPlat = (data: any, token: string)=>{
        return this.service.postFormData(
            url.plats.new,
            token,
            data,
        );
    }

    updatePlat = (id: string, data: any, token: string) => {
        return this.service.putData(
            url.plats.updateOrDelete + id,
            token,
            data,
        );
    }

    deletePlat = (id: string, token: string) => {
        return this.service.deleteData(
            url.plats.updateOrDelete + id,
            token,
        );
    }
}