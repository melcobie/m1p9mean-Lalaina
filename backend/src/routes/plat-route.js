const express = require("express");
const { getPlats, newPlats, updatePlat, deletePlat } = require("../service/plat-service");
const { getUserByToken } = require("../service/user-service");
const { type } = require("../util/constant");
const multer = require("multer");
const router = express.Router();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './dist/frontend/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({ 
    dest: "./dist/frontend/uploads/",
    storage 
})

router.post("/", async (req, res) => {
    try{
        const plats = await getPlats(req.body);
        res.status(200).send(plats);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.post('/new', upload.any(), async (req, res)=>{
    try{
        if(!req.files){
            throw new Error("Entrez une image")
        }
        const newPlat = await newPlats(req.body, req.files[0]);
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