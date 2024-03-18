const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    Products: [{
        ProductID: { type: String, required: true },
        Quantity: { type: Number, required: true, min: 0, max: 5 }
    }],
    TotalPrice: {type: Number, required: true}
}, {versionKey: false})

module.exports = mongoose.model('order', orderSchema)