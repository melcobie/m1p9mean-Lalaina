require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Token = require("../models/tokens");
const { type } = require("../util/constant");
const { getUserByUsername } = require("../service/user-service");

router.post("/signin", async (req, res)=>{ 
    try{
        const users = await User.findOne({
            email : req.body.username,
            password : req.body.password,
        });
        if(users == null){
            return res.status(500).json({ message : "Le nom d'utilisateur ou le mot de passe est incorrect"});
        }
        const accessToken = await generateToken({username : users.email, type: users.type});
        res.send({user:users, accessToken});
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.post("/signup", getUserByUsername,async(req, res)=>{
    req.body = {...req.body, type: type.ROLE_CLIENT};
    let user = new User(req.body);
    try{
        const newUser = await user.save();
        const accessToken = await generateToken({username : newUser.email, type: newUser.type});
        res.status(201).json({user:newUser, accessToken});
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

// router.get("/user", getUserByToken, async(req, res)=>{
//     try{
//         const user = await User.findOne(req.user);
//         res.send(user);
//     }catch(err){
//         res.status(500).json({ message : err.message });
//     }
// })

router.delete("/logout", async(req, res)=>{
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    try{
        await Token.deleteMany({token});
        res.sendStatus(204);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

async function generateToken(user){
    const accessToken = jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn : "24h"});
    const token = new Token({token : accessToken});
    await token.save();
    return accessToken;
}

module.exports = router;