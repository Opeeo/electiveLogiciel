const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name:{
        type: String,
        trquired: [true, "Uploaded file must have a name"],
    },
});

module.exports = mongoose.model("File", fileSchema);