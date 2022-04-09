const express = require("express");
const { getBeneficeDaily } = require("../service/benefice-service");
const router = express.Router();

router.get("/day", async (req, res)=>{
    try{
        const benefice = await getBeneficeDaily(req.body);
        res.status(200).send(benefice);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

module.exports = router;