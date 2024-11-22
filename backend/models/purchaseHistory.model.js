import mongoose from "mongoose";

const purchaseHistorySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    purchaseDate: { type: Date, default: Date.now },
    tokensSpent: { type: Number, required: true },
})

export const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema)