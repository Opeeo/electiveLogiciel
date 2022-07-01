const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    siret_number: Number,
    description: String,
    street_name: String,
    additional_adress: String,
    street_number: Number,
    postal_code: Number,
    city: String,
    type: String,
    id_restaurator: {
        type: String,
        required: [true, "id_restaurator required"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);