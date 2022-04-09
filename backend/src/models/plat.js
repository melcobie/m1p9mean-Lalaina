const mongoose = require("mongoose");

const platSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    costPrice: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
    },
    image: {
        type: String,
    },
    restaurant: {
        type: Object,
        required: true,
        schema: {
            _id: { type: String, required: true},
            name: { type: String, required: true},
            location: { type: String }
        },
    }
},{
    collation: { locale: "en", strength:2}
});

module.exports = {
    plat : mongoose.model("plat", platSchema),
    platSchema,
}