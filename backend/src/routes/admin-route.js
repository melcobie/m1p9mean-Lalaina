const express = require("express");
const { type } = require("../util/constant");
const router = express.Router();
const { getUsersByType, newUser, getUserByToken, getUsersByData, getUserByUsername } = require("../service/user-service");
const users = require("../models/users");

function isAdmin(req, res, next){
    if(req.user.type.identifier !== type.ROLE_ADMIN.identifier) return res.status(403).send({message: "Vous n'en avez pas l'autorisation"});
    next();
}

// Restaurant management
router.get("/restaurant", async (req, res)=>{
    try{
        const userRegex = new RegExp(req.query.name, 'i')
        const restaurants = !req.query.name
            ? await getUsersByType(type.ROLE_RESTAURANT)
            : await getUsersByData({
                username: userRegex,
                type: type.ROLE_RESTAURANT,
            });
        res.json(restaurants);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
});

router.post("/restaurant", getUserByToken, isAdmin, getUserByUsername, async (req, res)=>{
    const data = {
        ...req.body,
        type : type.ROLE_RESTAURANT,
    }
    try{
        const restaurant = await newUser(data);
        res.status(201).json(restaurant);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
});

// Livreur management
router.get("/livreur", async(req, res)=>{
    try{
        const userRegex = new RegExp(req.query.name, 'i')
        const restaurants = !req.query.name
        ? await getUsersByType(type.ROLE_LIVREUR)
        : await getUsersByData({
            username: userRegex,
            type: type.ROLE_LIVREUR,
        });
        res.json(restaurants);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
});

router.post("/livreur", getUserByToken, isAdmin, getUserByUsername, async (req, res)=>{
    const data = {
        ...req.body,
        type : type.ROLE_LIVREUR,
    }
    try{
        const restaurant = await newUser(data);
        res.status(201).json(restaurant);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

//Delete
router.delete("/user", getUserByToken, isAdmin, async (req, res)=>{
    try{
        await users.findByIdAndDelete(req.body.id);
        res.sendStatus(204);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

module.exports = router;