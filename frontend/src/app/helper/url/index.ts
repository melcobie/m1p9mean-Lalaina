export const baseUrl = "http://localhost:3000/";

export const url = {
    signin: "/signin",
    signup: "/signup",
    logout: "/logout",
    restaurants: {
        get: "/restaurant",
        delete: "/user",
    },
    livreurs: {
        get: "/livreur",
        delete: "/user",
    },
    plats: {
        get: "/plat",
        new: "/plat/new",
        updateOrDelete: "/plat/",
    },
    commande: {
        new: "/commande",
    }
}