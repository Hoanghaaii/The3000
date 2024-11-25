import express from "express";
import rewardsController from "../controllers/rewards.controller.js";

const router = express.Router();

router.post('/create', rewardsController.createRewards);

router.put('/update/:id', rewardsController.updateRewards);

router.delete('/delete/:id', rewardsController.deleteRewards);

router.get('/', rewardsController.getRewards);

router.get('/:email', rewardsController.getRewardsForUser);

router.get('/detail/:id', rewardsController.getRewardById);

export default router;