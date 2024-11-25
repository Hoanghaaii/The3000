import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
// import { createContent, deleteContent, getContent, updateContent } from '../controllers/content.controller.js'
// import { uploadContentMiddleWare } from '../storage/cloudinary.js'
import { getProfile } from "../controllers/profile.controller.js";
const router = express.Router();

router.get("/", verifyToken, getProfile);

export default router;
