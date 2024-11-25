import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendResetPassword, sendVerifyCode } from '../email/nodemailer.js'
import { generateCode } from '../utils/generateVeriryCode.js'
import crypto from "crypto";    

export const login = async (req, res)=>{
   try {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({success: false, message: "Email and password are required!"})
    }
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(400).json({success: false, message: "User is not found!"})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        return res.status(400).json({success: false, message: "Password was wrong!"})
    }
    const token = await generateTokenAndSetCookie(res, user._id)
    return res.status(200).json({success: true, message: "Login successfully!", token})
   } catch (error) {
        return res.status(500).json({success: false, message:"Server error", error: error.message})
   }
}

export const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body
        if(!email || !password || !name){
            return res.status(400).json({success: false, message: "Email and password are required!"})
        }
        const isExistEmail = await User.findOne({email: email});
        if(isExistEmail){
            return res.status(400).json({success: false, message: "Email is already used!"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: hashedPassword,
            name
        })
        await newUser.save()
        return res.status(201).json({success: true, message: "Sign Up Successfully!"})
    } catch (error) {
        return res.status(500).json({success: false, message:"Server error", error: error.message})
    }
}

export const checkver = async (req, res)=>{
    try {
        const {userId} = req
		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
		return res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		return res.status(400).json({ success: false, message: error.message });
	}
}

export const sendVerifyEmail = async (req, res)=>{
    try {
        // const {userId} = req
        // const user = await User.findById(userId)
        // if(!user){
        //     return res.status(400).json({success: false, message: "User not found"})
        // }
        const {email} = req.body
        if(!email){
            return res.status(400).json({success: false, message: "Email is required"})
        }
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({success: false, message: "User of this email not found"})
        }
        if(user.isEmailVerified){
            return res.status(400).json({success: false, message: "This email was Verified"})
        }
        const code = generateCode()
        user.verifyCode = code;
        user.verifyCodeExpiresAt = Date.now() + 15 * 60 * 1000 //verifyCode het han trong 15 phut
        await user.save()
        await sendVerifyCode(user.email, code)
        return res.status(200).json({success: true,  message: "Verification email sent successfully!" });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server error', error: error.message})
    }
}

export const verifyEmail = async (req, res)=>{
    try {
        const {code} = req.body

        const user = await User.findOne({verifyCode: code, verifyCodeExpiresAt: {$gt: Date.now()}})
        if(!user){
            return res.status(400).json({success: false, message: "Can not find user or Verify Code is expired"})
        }
        user.verifyCode = undefined
        user.isEmailVerified = true
        user.verifyCodeExpiresAt = undefined
        user.save()
        return res.status(200).json({success: true, message: "Verify email successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error: ", error: error.message})
    }
}

export const updateProfile = async (req, res) => {
  const { userId } = req;  // Lấy userId từ req (sau khi xác thực người dùng)
  const { name, bio, socialLinks } = req.body;  // Lấy name và socialLinks từ yêu cầu

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Cập nhật thông tin người dùng
    if (name) user.name = name;
    if(bio) user.bio = bio
    if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };

    await user.save();  // Lưu thông tin người dùng vào cơ sở dữ liệu

    return res.status(200).json({ success: true, message: "Profile updated successfully!", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const sendResetPasswordLink = async (req, res)=>{
    try {
        const {userId} = req
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({success: false, message: "Can not find user"})
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordCode = resetToken
        user.resetPasswordCodeExpiresAt =  Date.now() + 15 * 60 * 1000
        const resetLink = `http://your-frontend-url/reset-password?token=${resetToken}`;
        await user.save()
        await sendResetPassword(user.email,resetLink )
        return res.status(200).json({success: true, message: "Send reset password link successfully", resetLink})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error: ", error: error.message})
    }
}

export const changePassword = async (req, res)=>{
    try {
        const {token, newPassword} = req.body
        if(!token || !newPassword){
            return res.status(400).json({success: false, message: "Token and new password are required"})
        }
        const user = await User.findOne({resetPasswordCode: token, resetPasswordCodeExpiresAt:{$gt: Date.now()}})
        if(!user){
            return res.status(400).json({success: false, message: "Can not find user or reset password code is expired"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        user.resetPasswordCode = undefined
        user.resetPasswordCodeExpiresAt = undefined
        await user.save() 
        return res.status(200).json({success: true, message: "Reset password link successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error: ", error: error.message})
    }
}