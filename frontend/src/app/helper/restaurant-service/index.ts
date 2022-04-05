import { Injectable } from "@angular/core";
import { Service } from "../api";
import { url } from "../url";

@Injectable({
    providedIn: "root"
})
export class RestaurantService{
    constructor(private service: Service){}

    getRestaurant = (data: any) => {
        return this.service.getWithoutToken(url.restaurants.get, data);
    }

    deleteRestaurant = (data: any, token: string) => {
        return this.service.deleteData(url.restaurants.delete, token, data);
    }

    createRestaurant = (data: {
        username: string,
        password: string,
        email: string, 
        location: string,
    }, token: string) => {
        return this.service.postData(url.restaurants.get, token, data);
    }
}