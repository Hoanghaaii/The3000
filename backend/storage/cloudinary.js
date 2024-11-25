import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';

const storage = multer.memoryStorage();
export const uploadContentMiddleWare = multer({ storage }).single('url');
export const uploadprofilePictureMiddleWare = multer({ storage }).single('profilePicture');

// Cloudinary Configuration


// Upload to Cloudinary using a Buffer
export const uploadContentToCloudinary = async (fileBuffer) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'content_images',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return reject(new Error('Failed to upload to Cloudinary'));
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const uploadProfilePictureToCloudinary = async (fileBuffer) => {
  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return await new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'profile_images',
      resource_type: 'image',
    },
    (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        return reject(new Error('Failed to upload to Cloudinary'));
      }
      resolve(result);
    }
  );
  streamifier.createReadStream(fileBuffer).pipe(uploadStream);
});
};
