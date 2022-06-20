const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    type: String,
    price: Number,
    description: String,
    id_restaurant: {
        type: String,
        required: [true, "id_restaurant required"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('Article', articleSchema);