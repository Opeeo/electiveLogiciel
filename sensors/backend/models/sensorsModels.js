const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type:{
        type: String,
        required: [true,'Please add a type']
    } ,
    datas:{
        type: Array
    },
    metrics:{
        type: Boolean
    }
})

module.exports = mongoose.model('Sensors', sensorSchema)