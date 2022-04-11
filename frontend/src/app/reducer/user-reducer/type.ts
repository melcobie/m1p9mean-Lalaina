export interface EKalyStore{
    user : User|null,
    accessToken : string,
    commande: Commande,
}

export type User = {
    _id : string,
    username : string,
    email : string,
    type: {
        identifier: string,
        name: string,
    }
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
    etatLivraison: {
        delivered: boolean,
        dateLivraison?: Date,
        livreur?: User,
    },
    date?: Date,
};