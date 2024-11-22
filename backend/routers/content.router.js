import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createContent, getContent } from '../controllers/content.controller.js'

const router = express.Router()

router.get('/get', verifyToken, getContent)
router.post('/create', verifyToken, createContent)

export default router