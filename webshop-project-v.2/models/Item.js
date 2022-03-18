const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema for each product on the app.
const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 200 },
    image: { type: String, required: true},
    price: { type: Number, required: true },
    price_code: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Item = mongoose.model('item', ItemSchema)

module.exports = Item