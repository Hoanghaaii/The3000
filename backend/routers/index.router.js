
import express from "express";
import authRouter from "../routers/auth.router.js";
import contentRouter from "../routers/content.router.js";
import profileRouter from "../routers/profile.router.js";
import watchHistoryRouter from '../routers/watchHistory.router.js'

const router = express.Router();

router.use("/auth", authRouter);
router.use("/content", contentRouter);
router.use("/profile", profileRouter);
router.use('/watch-history', watchHistoryRouter)
