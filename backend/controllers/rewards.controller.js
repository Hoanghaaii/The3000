import { Rewards } from '../models/rewards.model.js';
import { User } from '../models/user.model.js';

class RewardsController {

    async getRewards(req, res, next) {
        try {
            const rewards = await Rewards.findAll();
            return res.status(200).json(rewards);
        } catch (err) {
            return res.status(500).send('Server error');
        }
    }

    async getRewardsForUser(req, res, next) {
        const { email } = req.params;
        try {
            const user = Rewards.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const rewards = await User.find({ userId: user._id });
            return res.status(200).json({ rewards });

        } catch (err) {
            return res.status(500).send('Server error');
        }
    }

    async getRewardById(req, res, next) {
        const { id } = req.params;

        try {
            const reward = await Rewards.findOne({ _id: id });
            if (!reward) {
                return res.status(404).json({ message: "Reward not found" });
            }

            return res.status(200).json({ reward });
        } catch (err) {
            return res.status(500).send('Server error');
        }
    }

    async createRewards(req, res, next) {
        const { email, rewardType, amount, description } = req.body;

        try {
            const user = User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const newReward = new Rewards({
                userId: user._id,
                rewardType,
                amount,
                description,
            });

            const savedReward = await newReward.save();

            return res.status(201).json({
                message: "Reward created successfully",
                reward: savedReward
            });

        } catch (err) {
            res.status(500).send('Server error');
        }
    }

    async updateRewards(req, res, next) {
        const { id } = req.params;

        const { rewardType, amount, description } = req.body;

        try {
            const reward = await Rewards.findOne({ _id: id });
            if (!reward) {
                return res.status(404).json({ message: "Reward not found" });
            }

            if (rewardType) existingReward.rewardType = rewardType;
            if (amount) existingReward.amount = amount;
            if (description) existingReward.description = description;

            const updateReward = await existingReward.save();

            return res.status(200).json({
                message: 'Reward updated successfully',
                reward: updateReward,
            });
        } catch (err) {
            return res.status(500).send('Server error');
        }

    }

    async deleteRewards(req, res, next) {
        const { id } = req.params;
        try {
            const reward = await Rewards.findOne({ _id: id });
            if (!reward) {
                return res.status(404).json({ message: "Reward not found" });
            }
            await reward.remove();

            return res.status(200).json({
                message: 'Reward deleted successfully',
                _id: id,
            })
        } catch (err) {
            return res.status(500).send('Server error');
        }
    }

}

export default new RewardsController();