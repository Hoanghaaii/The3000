import express from "express";
import purchaseHistory from "../controllers/purchaseHistory.controller";

const router = express.Router();

router.post('/create', purchaseHistory.createPurchaseHistory);

router.put('/update/:id', purchaseHistory.updatePurchaseHistory);

router.delete('/delete/:id', purchaseHistory.deletePurchaseHistory);

router.get('/', purchaseHistory.getAllPurchaseHistory);

router.get('/:email', purchaseHistory.getByUserPurchaseHistory);

router.get('/detail/:id', purchaseHistory.getByIdPurchaseHistory);

export default router;