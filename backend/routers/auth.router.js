import express from 'express'
import { checkver, login, signup } from '../controllers/auth.controller.js'
import {verifyToken} from '../middleware/verifyToken.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/login',login)
router.get('/check',verifyToken,checkver)

export default router