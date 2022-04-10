const express = require("express");
const { submitCommande, getCommandeParRestaurant, getCommandes, deliver, getCommandeById } = require("../service/commande-service");
const { getUserByToken } = require("../service/user-service");
const { type } = require("../util/constant");

const router = express.Router();

router.post("/filter", async (req, res)=>{
    try{
        const commandes = await getCommandes(req.body);
        res.status(201).send(commandes);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.post("/", getUserByToken, async (req, res)=>{
    try{
        let data = {
            ...req.body,
            client: req.user,
        }
        const commande = await submitCommande(data);
        res.status(201).send(commande);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.get("/:id", async (req, res)=>{
    try{
        let id = req.params.id;
        const commandes= await getCommandeById(id);
        res.send(commandes);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.get("/", async (req, res)=>{
    try{
        let restaurantId = req.query.idRestaurant;
        let etatLivraison = req.query.etatLivraison;
        const commandes= await getCommandeParRestaurant(restaurantId, etatLivraison);
        res.send(commandes);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.post("/deliver/:id", getUserByToken, isLivreur, async (req, res)=>{
    try{
        const commande = await deliver(req.params.id, req.user);
        res.status(204).send(commande);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

async function isLivreur(req, res, next){
    if(req.user.type.identifier !== type.ROLE_LIVREUR.identifier) return res.status(403).send({message: "Vous n'en avez pas l'autorisation"});
    next();
}


router.put("/deliver", getUserByToken, )

module.exports = router;