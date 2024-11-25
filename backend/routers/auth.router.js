import express from 'express'
import { checkver, login, signup, sendVerifyEmail, verifyEmail, updateProfile, sendResetPasswordLink, changePassword } from '../controllers/auth.controller.js'
import {verifyToken} from '../middleware/verifyToken.js'
import { refreshAccessToken } from '../utils/generateTokenAndSetCookie.js'
import {uploadprofilePictureMiddleWare } from '../storage/cloudinary.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/login',login)
router.get('/get-profile',verifyToken,checkver)
router.get('/refresh-token', refreshAccessToken)
router.post('/send-verify-email', sendVerifyEmail)
router.post('/verify-email', verifyEmail)
router.put('/update-profile',verifyToken,uploadprofilePictureMiddleWare,updateProfile)
router.post('/send-password-link',verifyToken,sendResetPasswordLink)
router.post('/reset-password',verifyToken,changePassword)


export default router