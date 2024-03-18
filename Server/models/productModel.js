const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Code: {type: Number, required: true},
    Name: {type: String, required: true},
    Price: {type: Number, required: true},
    Image: {type: String, required: true},
}, {versionKey: false})

module.exports = mongoose.model('product', productSchema)