const { plat } = require("../models/plat");

async function getPlats(data){
    let plats;
    try{
        let name = new RegExp(data.name, 'i');
        let minPrice = data.min ? { $gte: data.min } : { $gte: 0 };
        let maxPrice = data.max ? { $lte: data.max } : 0;
        let price = data.max> 0 ? { ...minPrice, ...maxPrice } : minPrice;
        let type = new RegExp(data.type, 'i');
        let restaurants = data.restaurants === ""? [] : data.restaurants.split(",");
        let cond = restaurants.length===0? {} : {'restaurant._id': { $in: restaurants } };
        plats = await plat.find({
            name,
            price,
            type,
            ...cond
        });
        return plats;
    }catch(err){
        throw err;
    }
}

async function newPlats(data, image){ 
    try{
        let plats = {
            name : data.name,
            price: parseInt(data.price),
            costPrice: parseInt(data.costPrice),
            type: data.type,
            restaurant: JSON.parse(data.restaurant),
            image: image.originalname,
        }
        let newPlat = new plat(plats);
        newPlat = await newPlat.save();
        return newPlat;
    }catch(err){
        throw err;
    }
}

async function updatePlat(id, data){
    try{
        return await plat.findByIdAndUpdate(id, data);
    }catch(err){
        throw err;
    }
}

async function deletePlat(id){
    try{
        return await plat.findByIdAndDelete(id);
    }catch(err){
        throw err;
    }
}

async function getPlatsByName(name){
    try{
        return await plat.find({name});
    }catch(err){
        throw err;
    }
}

async function batchDeletePlat(filter){
    try{
        return await plat.deleteMany(filter);
    }catch(err){
        throw err;
    }
}

module.exports = {
    getPlats,
    newPlats,
    getPlatsByName,
    updatePlat,
    deletePlat,
    batchDeletePlat,
}