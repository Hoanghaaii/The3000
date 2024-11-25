import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createWatchHistory, deleteWatchHistory, getWatchHistoryByUserId, updateProgressWatchHistory } from '../controllers/watchHistory.controller.js'

const router = express.Router()

router.post('/create-watch-history', verifyToken, createWatchHistory)

router.post('/update-progress', verifyToken,updateProgressWatchHistory)

router.get('/get-watch-histories', verifyToken, getWatchHistoryByUserId)

router.delete('/delete-watch-history/:watchHistoryId', verifyToken, deleteWatchHistory)

export default router