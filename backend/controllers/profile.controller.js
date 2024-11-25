import {User} from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    const userExist = await User.findById(userId).select("-password");
    if (!userExist) throw new Error("Not found user");

    return res.json(userExist);
  } catch (err) {
    console.error("Error creating content:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
