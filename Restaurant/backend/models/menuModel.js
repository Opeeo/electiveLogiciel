const mongoose = require('mongoose');
const Action = require("./articleModel");

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    type: String,
    price: Number,
    description: String,
    articles: [mongoose.Schema.Types.ObjectId],
    id_restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "id_restaurant required"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('Menu', menuSchema);