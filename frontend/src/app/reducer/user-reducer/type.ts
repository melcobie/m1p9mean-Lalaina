export interface EKalyStore{
    user : {
        _id : string,
        username : string,
        email : string,
        type: {
            identifier: string,
            name: string,
        }
    }|null,
    accessToken : string,
    commande: Commande,
}

export type Commande = {
    plats: Array<{
        plat: any,
        quantite: number,
        price: number,
        costPrice: number,
    }>,
    price: number,
    costPrice: number,
    addresse?: string,
};