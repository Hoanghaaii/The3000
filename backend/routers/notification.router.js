import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addNoti,
  getNoti,
  delNoti,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.post("/", verifyToken, addNoti);

router.get("/get-noti", verifyToken, getNoti);
// router.put("/update-noti", verifyToken, updateNoti)
router.delete("/delete-noti", verifyToken, delNoti);

export default router;
