import express from 'express'
import authRouter from '../routers/auth.router.js'
import contentRouter from '../routers/content.router.js'
const router = express.Router()

router.use('/auth',authRouter)
router.use('/content', contentRouter)

export default router