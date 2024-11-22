import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    priceInTokens: { type: Number, default: 0 },
    contentType: { type: String, enum: ["video", "article", "image", "audio"], required: true },
    url: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true },
},{ timestamps: true })

export const Content = mongoose.model('Content', contentSchema)