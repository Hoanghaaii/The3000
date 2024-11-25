import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String},
    profilePicture: { type: String },
    bio: { type: String },
    interests: { type: [String] },
    isActive: { type: Boolean, default: true },
    level: { type: Number, default: 1 },
    experiencePoints: { type: Number, default: 0 },
    tokens: { type: Number, default: 0 },
    isEmailVerified: {type: Boolean, default: false},
    verifyCode: {type: String},
    verifyCodeExpiresAt: {type: Date},
    resetPasswordCode: {type: String},
    resetPasswordCodeExpiresAt: {type: Date},
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)