const express = require("express");
const { getBeneficeDaily, getBeneficeParRestaurant, getBeneficeRestaurant } = require("../service/benefice-service");
const router = express.Router();

router.get("/day", async (req, res)=>{
    try{
        const benefice = await getBeneficeDaily(req.body);
        res.status(200).send(benefice);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router.get("/restaurant", async (req, res)=>{
    try{
        let idRestaurant = req.query?.idRestaurant;
        const benefice = !idRestaurant
            ? await getBeneficeParRestaurant(req.body)
            : await getBeneficeRestaurant(idRestaurant) ;
        res.status(200).send(benefice);
    }catch(err){
        res.status(500).json({ message : err.message });
    }
})

router

module.exports = router;