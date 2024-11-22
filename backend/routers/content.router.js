import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createContent, deleteContent, getContent, updateContent } from '../controllers/content.controller.js'
import { uploadMiddleWare } from '../storage/cloudinary.js'

const router = express.Router()

router.get('/get-contents', verifyToken, getContent)
router.post('/create-content', verifyToken,uploadMiddleWare, createContent)
router.put('/update-content/:id', verifyToken, uploadMiddleWare, updateContent)
router.delete('/delete-content/:id', verifyToken, deleteContent)

export default router