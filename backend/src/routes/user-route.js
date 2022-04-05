const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { getUser } = require("../service/user-service");


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