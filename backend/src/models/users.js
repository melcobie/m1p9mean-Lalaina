const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    type : {
        type: Object,
        schema: {
            identifier: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    location: {
        type: String,
    }
},{
    collation: { locale: "en", strength:2}
});

module.exports = mongoose.model("user", usersSchema);