import { Content } from "../models/content.model.js"

export const createContent = async (req, res)=>{
    try {
        const {title, description, category, priceInTokens, contentType, url, isPublished} = req.body
        const {userId} = req
        if(!title || !category || !contentType){
            return res.status(400).json({success: false, message:"Missing fields!"})
        }
        const newContent = new Content({
            title,
            description,
            category,
            priceInTokens,
            contentType,
            url,
            isPublished,
            createdBy: userId
        })
        await newContent.save()
        return res.status(201).json({ success: true, message: "Content created successfully" });
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error", error: error.message});
    }
}

export const getContent = async (req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1; // Mặc định là trang 1
        const limit = parseInt(req.query.limit) || 10; // Mặc định là 10 mục mỗi trang
        const skip = (page - 1) * limit;
        const totalContents = await Content.countDocuments();
        const totalPages = Math.ceil(totalContents / limit)
        const contents = await Content.find({})
            .sort({createAt: -1})
            .skip(skip)
            .limit(limit)
        if(!contents || contents.length === 0){
            return res.status(400).json({success: false, message:"No content found"})
        }
        return res.status(200).json({
            success: true,
            message: "Get content successfully",
            totalContents,
            totalPages: totalPages,  // Tổng số trang
            currentPage: page,  // Trang hiện tại
            contents,
        });
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error", error: error.message});
    }
}