import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String},
})

export const User = mongoose.model('User', userSchema)