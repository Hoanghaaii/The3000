import express from 'express'
import { checkver, login, signup, sendVerifyEmail, verifyEmail } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { refreshAccessToken } from '../utils/generateTokenAndSetCookie.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/get-profile', verifyToken, checkver)
// router.get('/get-profile', checkver)

router.get('/refresh-token', refreshAccessToken)
router.post('/send-verify-email', sendVerifyEmail)
router.post('/verify-email', verifyEmail)


export default router