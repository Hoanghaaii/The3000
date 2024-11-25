import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createWatchHistory, updateProgressWatchHistory } from '../controllers/watchHistory.controller.js'

const router = express.Router()

router.post('/create-watch-history', verifyToken, createWatchHistory)
router.post('/update-progress', verifyToken,updateProgressWatchHistory)
router.get('/get-watch-histories')

export default router