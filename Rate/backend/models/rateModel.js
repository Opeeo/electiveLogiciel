const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
    stars_number: {
        type: Number,
        required: [true, "Stars_number is required"]
    },
    comment: String,
    id_restaurant: mongoose.Schema.Types.ObjectId,
    id_consumer: {
        type: Number,
        required: [true, "id_consumer required"]
    },
    id_deliveryman: Number,
},{
    timestamps: true,
});


module.exports = mongoose.model('Rate', rateSchema);