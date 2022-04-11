const commande = require("../models/commande");

async function getBenefice(filter, group, sort){
    filter = { ...filter, "etatLivraison.delivered":true};
    try{
        const benefice = await commande.aggregate([{
            $match: filter
        },{
            $group: {
                _id: group,
                totalPrice: { $sum: "$price"},
                costPrice: { $sum: "$costPrice"},
                recipe: { $sum: { $subtract: ["$price", "$costPrice"]}}
            }
        },{
            $sort: { [sort]: -1}
        }])
        return benefice;
    }catch(err){
        throw err;
    }
}

async function getBeneficeDaily(filter){
    return getBenefice(
        filter,
        { $dateToString: { format: "%Y-%m-%d", date: "$date"}},
        "_id",
    );
}

async function getBeneficeParRestaurant(filter, group = "$plats.plat.restaurant", sort = "recipe"){
    filter = { ...filter, "etatLivraison.delivered":true};
    try{
        const benefice = await commande.aggregate([{
            $unwind: { path: "$plats"}
        },{
            $match: filter
        }
        ,{
            $group: {
                _id: group,
                totalPrice: { $sum: "$plats.price"},
                costPrice: { $sum: "$plats.costPrice"},
                recipe: { $sum: { $subtract: ["$plats.price", "$plats.costPrice"]}}
            }
        },{
            $sort: { [sort]: -1}
        }])
        return benefice;
    }catch(err){
        throw err;
    }
}

async function getBeneficeRestaurant(idRestaurant){
    let filter = {
        "plats.plat.restaurant._id":idRestaurant,
    };
    return getBeneficeParRestaurant(
        filter,
        { $dateToString: { format: "%Y-%m-%d", date: "$date"}},
        "_id",
    );
}

module.exports = {
    getBenefice,
    getBeneficeDaily,
    getBeneficeRestaurant,
    getBeneficeParRestaurant,
}

