import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createContent, deleteContent, getContent, getContentById, updateContent } from '../controllers/content.controller.js'
import { uploadContentMiddleWare } from '../storage/cloudinary.js'

const router = express.Router()

router.get('/get-content/:id', verifyToken, getContentById)

router.get('/get-contents', verifyToken, getContent)

router.post('/create-content', verifyToken,uploadContentMiddleWare, createContent)

router.put('/update-content/:id', verifyToken, uploadContentMiddleWare, updateContent)

router.delete('/delete-content/:id', verifyToken, deleteContent)


export default router