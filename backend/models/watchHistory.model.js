import mongoose from "mongoose";

const watchHistorySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    watchDate: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
})

export const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema)