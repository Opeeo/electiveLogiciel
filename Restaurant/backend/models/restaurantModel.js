const mongoose = require('mongoose');
const { getOriginalNode } = require('typescript');

const restaurantSchema = mongoose.Schema({
    name: {
        String,
        required: [true, 'Please add a name of the restaurant'],
    },
    siret_number: {
        Number,
        required: [true, 'Please add the Siret number of the restaurant'],
    },
    description: {
        String,
        required: [true, 'Please add a description of the restaurant'],
    },
    street_name: {
        String,
        required: [true, 'Please add the street of the restaurant'],
    },
    additional_adress: String,
    street_number: {
        Number,
        required: [true, 'Please add the street number of the restaurant'],
    },
    postal_code: {
        Number,
        required: [true, 'Please add the postal code of the restaurant'],
    },
    city: {
        String,
        required: [true, 'Please add the city of the restaurant'],
    },
    id_restaurator: {
        Number,
        required: [true, 'Please add the id of the owner of the restaurant'],
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);