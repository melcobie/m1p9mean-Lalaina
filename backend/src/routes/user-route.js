const express = require("express");
const router = express.Router();
const Users = require("../models/users");

async function getUser(req, res, next) {
    let user;
    try{
        user = await Users.findById(req.params.id);
        if(user == null){
            return res.status(401).json({message : "Could not find user"});
        }
    }catch(err){
        return res.status(500).json({message : err.message});
    }
    res.user = user;
    next();
}

router.get("/", async (req, res)=>{
    try{
        const users = await Users.find();
        res.json(users);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
});

router.post("/", async (req, res)=>{
    const user = new Users(req.body);
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

router.get("/:id", getUser, async (req, res) => {
    try{
        res.send(res.user);
    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

router.delete("/:id", getUser,async (req, res) => {
    try{
        await res.user.deleteOne();
        res.json({message : "Deleted"});
    }catch(err){
        return res.status(500).json({message : err.message});
    }
})



module.exports = router;