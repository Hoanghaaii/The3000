import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    category: {type: String}
})

export const Product = mongoose.model('Product', productSchema)