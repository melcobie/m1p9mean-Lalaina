const express = require("express");
const { getPlats, newPlats, updatePlat, deletePlat } = require("../service/plat-service");
const { getUserByToken } = require("../service/user-service");
const { type } = require("../util/constant");
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const plats = await getPlats(req.body);
        res.status(200).send(plats);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.post('/new', getUserByToken, isRestaurant, async (req, res)=>{
    try{
        const newPlat = await newPlats(req.body);
        res.status(201).send(newPlat);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.put("/:id", getUserByToken, isRestaurant, async(req, res)=>{
    try{
        const newPlat = await updatePlat(req.params.id, req.body);
        res.status(204).send(newPlat);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.delete("/:id", getUserByToken, isRestaurant, async(req, res)=>{
    try{
        await deletePlat(req.params.id);
        res.sendStatus(204);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

function isRestaurant(req, res, next){
    if(req.user.type.identifier !== type.ROLE_RESTAURANT.identifier) return res.status(403).send({message: "Vous n'en avez pas l'autorisation"});
    next();
}

module.exports = router;