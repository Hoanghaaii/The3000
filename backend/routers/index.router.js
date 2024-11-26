

import express from "express";
import authRouter from "../routers/auth.router.js";
import contentRouter from "../routers/content.router.js";
import profileRouter from "../routers/profile.router.js";
import watchHistoryRouter from '../routers/watchHistory.router.js'
import rewardRoutter from '../routers/rewards.router.js'
import purchaseRouter from '../routers/purchaseHistory.router.js'
import categoryRouter from '../routers/category.router.js'

const router = express.Router();

router.use("/auth", authRouter);

router.use("/content", contentRouter);

router.use("/profile", profileRouter);

router.use('/watch-history', watchHistoryRouter)

router.use('/rewards', rewardRoutter);

router.use('/purchase-history', purchaseRouter)

router.use('/category', categoryRouter)



export default router