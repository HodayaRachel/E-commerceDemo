const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/EcommerceDB').then(() => console.log('connected to db'))