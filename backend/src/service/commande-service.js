const commande = require("../models/commande");
const { sendMail } = require("../util/util");

async function submitCommande(data){
    try{
        let newCommande = new commande(data);
        newCommande = await newCommande.save();
        return newCommande;
    }catch(err){
        throw err;
    }
}

async function getCommandeById(id){
    try{
        return await commande.findById(id);
    }catch(err){
        throw err;
    }
}

async function getCommandes(filter){
    try{
        return await commande.find(filter).sort({date:1});
    }catch(err){
        throw err;
    }
}

async function getCommandeParRestaurant(restaurant, etatLivraison){
    let etat = etatLivraison === 'true'? true :false;
    return await getCommandes({"plats.plat.restaurant._id":restaurant, "etatLivraison.delivered":etat});
}

async function deliver(idCommande, livreur){
    try{
        let etatLivraison = {
            delivered : true,
            livreur,
            dateLivraison: new Date(),
        };
        let command = await commande.findByIdAndUpdate(idCommande, { etatLivraison });
        sendMail(command.client.email);
        return command;
    }catch(err){
        throw err;
    }
}

module.exports = {
    submitCommande,
    getCommandes,
    getCommandeParRestaurant,
    deliver,
    getCommandeById,
}