import { Injectable } from "@angular/core";
import { Service } from "../api";
import { url } from "../url";

@Injectable({
    providedIn: "root"
})
export class LivreurService{
    constructor(private service: Service){}

    getLivreur = (data: any) => {
        return this.service.getWithoutToken(url.livreurs.get, data);
    }

    deleteLivreur = (data: any, token: string) => {
        return this.service.deleteData(url.livreurs.delete, token, data);
    }

    createLivreur = (data: {
        username: string,
        password: string,
        email: string, 
    }, token: string) => {
        return this.service.postData(url.livreurs.get, token, data);
    }
}