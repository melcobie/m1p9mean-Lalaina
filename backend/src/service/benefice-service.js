const commande = require("../models/commande");

async function getBenefice(filter, group, sort){
    filter = { ...filter, "etatLivraison.delivered":false};
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

module.exports = {
    getBenefice,
    getBeneficeDaily,
}

