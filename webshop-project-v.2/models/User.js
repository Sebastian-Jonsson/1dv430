const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema for each User on the app. Cart not yet Implemented.
const UserSchema = new Schema({
    userType: { type: String, required: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 10, required: true },
    // cartTimer: { }
    cart:  {
        type: Array,
        default: [], // expires in x amount of time
        // expires: 3600
    },
    register_date: { type: Date, default: Date.now }
})



const User = mongoose.model('user', UserSchema)

module.exports = User