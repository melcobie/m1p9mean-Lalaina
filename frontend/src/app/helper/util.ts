import { baseUrl } from "./url"

export const fileUrl = (path: string)=>{
    return baseUrl + "uploads/" + path;
}