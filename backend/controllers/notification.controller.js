import Notification from "../models/notifications.model";
import { removeUnderfinedObjectKey } from "../utils";

export const getNoti = async (req, res) => {
  try {
    const { userId } = req;
    const notiByUserId = await Notification.find({
      userId,
    }).lean();
    if (notiByUserId.length <= 0) throw new Error("Không có thông báo nào.");

    res.status(200).json(notiByUserId);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateStatusNoti = async (req, res) => {
  try {
    const { idNoti, ...bodyUpdate } = req.body;

    await Notification.updateOne(
      { _id: idNoti },
      removeUnderfinedObjectKey(bodyUpdate)
    );
    return res.status(200).json({ message: "Update successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const delNoti = async (req, res) => {
  try {
    const { idNoti } = req.body;
    const result = await Notification.deleteOne({ _id: idNoti });
    if (!result) throw new Error("Something went wrong");
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
