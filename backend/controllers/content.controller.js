import { Content } from "../models/content.model.js"

import { uploadToCloudinary } from '../storage/cloudinary.js'; // Import hàm upload lên Cloudinary

export const createContent = async (req, res) => {
  try {
    const { title, description, category, priceInTokens, contentType, isPublished, url } = req.body;
    const { userId } = req;
    const file = req.file;

    if (!title || !category || !contentType) {
      return res.status(400).json({ success: false, message: "Missing fields!" });
    }

    // Xử lý file hoặc nội dung dạng text
    let contentUrl;
    if (file) {
      // Upload file lên Cloudinary
      const uploadedImage = await uploadToCloudinary(file.buffer);
      contentUrl = uploadedImage?.secure_url; // URL từ Cloudinary
    } else if (url) {
      // Nếu không có file, lưu nội dung dạng text
      contentUrl = url;
    } else {
      return res.status(400).json({ success: false, message: "No file or text content provided!" });
    }

    // Lưu nội dung vào cơ sở dữ liệu
    const newContent = new Content({
      title,
      description,
      category,
      priceInTokens,
      contentType,
      url: contentUrl, // URL hoặc nội dung dạng text
      isPublished,
      createdBy: userId,
    });
    await newContent.save();

    return res.status(201).json({ success: true, message: "Content created successfully", newContent });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



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

export const getContentById = async (req, res)=>{
  try {
    const {id} = req.params
    const content = await Content.findById(id)
    if(!content){
      return res.status(400).json({success: false, message: "Content not found"})
    }
    return res.status(200).json({success: true, message: "Get content by id successfully", content: content})
  } catch (error) {
    return res.status(500).json({success: false, message: "Server error", error: error.message});
  }
}

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, priceInTokens, contentType, isPublished } = req.body;
    const { userId } = req; // Assuming userId is provided through auth middleware
    const file = req.file;
    let uploadedImage;
    if(!id){
      return res.status(404).json({ success: false, message: 'Id is required' });
    }
    // If a file is uploaded, send it to Cloudinary
    if (file) {
      uploadedImage = await uploadToCloudinary(file.buffer);
    }

    // Find content by ID
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    // Check if the logged-in user is the creator of the content
    if (userId !== content.createdBy.toString()) {
      return res.status(403).json({ success: false, message: 'You are not the author of this content' });
    }

    // Update the content fields, only if the new value is provided
    content.title = title || content.title;
    content.description = description || content.description;
    content.category = category || content.category;
    content.priceInTokens = priceInTokens || content.priceInTokens;
    content.contentType = contentType || content.contentType;
    content.url = uploadedImage?.secure_url || content.url; // If a new image is uploaded, use its URL
    content.isPublished = isPublished !== undefined ? isPublished : content.isPublished; // Ensure isPublished has a value

    // Save the updated content
    await content.save();

    return res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      content,
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the content by ID
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    // Check if the user is authorized to delete the content
    const { userId } = req; // Assuming userId is available in the request, e.g., from authentication middleware
    if (userId !== content.createdBy.toString()) {
      return res.status(403).json({ success: false, message: 'You are not the author of this content' });
    }

    await Content.findByIdAndDelete(id);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
