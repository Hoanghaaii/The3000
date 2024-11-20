import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'

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
        const {email, password} = req.body
        if(!email || !password){
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
