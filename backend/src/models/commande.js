const mongoose = require("mongoose");
const { platSchema } = require("./plat");

const commandeSchema = mongoose.Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    client: {
        type: Object,
        required: true,
    },
    plats: {
        type: [{
            plat : {type : platSchema},
            quantite: { type: Number, default: 0},
            price: {type: Number, default: 0},
            costPrice: { type: Number, default: 0},
        }],
        default: [],
    },
    price: {type: Number, default: 0},
    costPrice: { type: Number, default: 0},
    addresse: {
        type: String,
        required: true,
    },
    etatLivraison: {
        type: Object,
        default: {
            delivered: false,
        },
        schema: {
            delivered: { type: Boolean, required: true },
            livreur: { type: String, },
            dateLivraison: { type: Date }
        }
    },
});

module.exports = mongoose.model("commandes", commandeSchema);