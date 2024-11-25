import { WatchHistory } from "../models/watchHistory.model.js"

export const getWatchHistoryByUserId = async (req, res)=>{
    try {
        const {userId} = req
        const watchhistories = await WatchHistory.find({userId: userId})
        if(!watchhistories){
            return res.status(400).json({success: false, message: "Can not find watchhistories"})
        }
        return res.status(200).json({success: "get watch history successfully", watchHistories: watchhistories})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error", error: error.message})
    }
}

export const createWatchHistory = async (req, res)=>{
    try {
        const {contentId} = req.body
        const {userId} = req
        if(!userId || !contentId){
            return res.status(400).json({success: false, message: "UserID and ContentId are required"})
        }
        const newWatchHistory = new WatchHistory({
            userId,
            contentId,
        })
        await newWatchHistory.save()
        return res.status(200).json({message: "Create watch history successfully", id: newWatchHistory._id})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error", error: error.message})
    }
}

export const updateProgressWatchHistory = async(req, res)=>{
    try {
        const {progress, watchHistoryId} = req.body
        const {userId} = req
        if(!progress || !watchHistoryId){
            return res.status(400).json({success: false, message: "Progress and contentId are required"})
        }
        const watchHistory = await WatchHistory.findById(watchHistoryId)
        if(!watchHistory){
            return res.status(400).json({success: false, message: "Can not find watch history"})
        }
        if(!userId !== watchHistory.userId){
            return res.status(400).json({success: false, message: "you are not author"})
        }
        await WatchHistory.findByIdAndUpdate(watchHistoryId, {progress: progress, watchDate: Date.now()})
        return res.status(200).json({message: "Update progress successfully"})

    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}

export const deleteWatchHistory = async (req, res)=>{
    try {
        const {watchHistoryId} = req.params
        const {userId} = req
        const watchHistory = await WatchHistory.findById(watchHistoryId)
        if(!watchHistory){
            return res.status(400).json({success: false, message: "Can not find watch history"})
        }
        if(userId !== watchHistory.userId.toString()){
            return res.status(400).json({success: false, message: "you are not author"})
        }
        await WatchHistory.findByIdAndDelete(watchHistoryId)
        return res.status(200).json({message: "Delete watch history successfully!"})
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message})
    }
}
