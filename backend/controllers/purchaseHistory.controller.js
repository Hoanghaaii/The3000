import { PurchaseHistory } from "../models/purchaseHistory.model";
import { User } from "../models/user.model";
import { Content } from "../models/content.model";


class PurchaseHistory {

    async getAllPurchaseHistory(req, res, next) {
        try {
            const purchasese = await PurchaseHistory.findAll();
            return res.status(200).json({ purchasese });
        } catch (err) {
            return res.status(500).send('Server Error');
        }
    }

    async getByIdPurchaseHistory(req, res, next) {
        const { id } = req.params;

        try {
            const purchase = await PurchaseHistory.findOne({ _id: id });
            if (!purchase) {
                return res.status(404).send({ message: "Purchase not found" });
            }

            return res.stauts(200).json({ purchase });
        } catch (err) {
            return res.status(500).send('Server Error');
        }
    }

    async getByUserPurchaseHistory(req, res, next) {
        const { email } = req.params;

        try {
            const user = PurchaseHistory.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const purchasese = await User.find({ userId: user._id });
            return res.status(200).json({ purchasese })
        } catch (err) {
            return res.status(500).send('Server Error');
        }
    }

    async createPurchaseHistory(req, res, next) {
        const { email, contentId, purchaseDate, tokensSpent } = req.body;

        try {
            const user = User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const content = Content.findOne({ _id: contentId });

            if (!content) {
                return res.status(404).json({ message: "Content not found" });
            }

            const newPurchase = new PurchaseHistory({
                userId: user._id,
                contentId: content._id,
                purchaseDate,
                tokensSpent
            })

            const savePurchase = await newPurchase.save();

            const populatePurchase = await PurchaseHistory.findById(savePurchase._id)
                .populate('userId')
                .populate('contentId');

            return res.status(201).json({
                message: "Purchase created successfully",
                purchase: populatePurchase
            });
        } catch (err) {
            return res.status(500).send({ message: "Server error" });
        }
    }

    async updatePurchaseHistory(req, res, next) {

    }

    async deletePurchaseHistory(req, res, next) {
        const { id } = req.params;

        try {
            const purchase = await PurchaseHistory.findOne({ _id: id });
            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }

            await purchase.remove();

            return res.status(200).json({
                message: "Purchase delete successfully",
                _id: id
            })
        } catch (err) {
            return res.status(500).send({ message: "Server error" });
        }

    }
}

export default new PurchaseHistory();