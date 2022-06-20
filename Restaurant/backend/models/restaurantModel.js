const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: String,
    siret_number: Number,
    description: String,
    street_name: String,
    additional_adress: String,
    street_number: Number,
    postal_code: Number,
    city: String,
    id_restaurator: Number,
},{
    timestamps: true,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);