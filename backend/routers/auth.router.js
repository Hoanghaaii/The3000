import express from 'express'
import { checkver, login, signup } from '../controllers/auth.controller.js'
import {verifyToken} from '../middleware/verifyToken.js'
import { refreshAccessToken } from '../utils/generateTokenAndSetCookie.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/login',login)
router.get('/check',verifyToken,checkver)
router.get('/refresh-token', refreshAccessToken)

export default router