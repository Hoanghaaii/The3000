import mongoose from "mongoose";

const rewardsSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rewardType: { type: String, enum: ["token", "xp", "content"], required: true },
    amount: { type: Number, required: true },
    rewardDate: { type: Date, default: Date.now },
    description: { type: String },
})

export const Rewards = mongoose.model('Rewards', rewardsSchema)