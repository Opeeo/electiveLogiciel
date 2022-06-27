const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    purchase_date: {
        type: Date,
        default: mongoose.now()
    },
    price: {
        type: Number,
        required: [true, "price required"]
    },
    articles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "articles required"]
    },
    menu: [mongoose.Schema.Types.ObjectId],
    delivered: {
        type: Boolean,
        default: false
    },
    id_restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "id_restaurator required"]
    },
    id_consumer: {
        type: Number,
        required: [true, "id_consumer required"]
    },
    id_deliveryman: {
        type: Number,
        required: [true, "id_deliveryman required"]
    },
},{
    timestamps: true,
});


module.exports = mongoose.model('Order', orderSchema);