import express from 'express'
import authRouter from '../routers/auth.router.js'
import contentRouter from '../routers/content.router.js'
import rewardRoutter from '../routers/rewards.router'
import purchaseRouter from '../routers/purchaseHistory.router.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/content', contentRouter)
router.use('/rewards', rewardRoutter);
router.use('/purchase-history', purchaseRouter)

export default router