import cloudinary from "../config/cloudinary"
import { cloudinary_folder_name } from "../constant/cloudinary";

export const uploadImage = async(image:string)=>{
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: cloudinary_folder_name,
      resource_type: "image",
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });
    return uploadedImage.secure_url;
}

export async function deleteImage(publicId:string) {
  try {    
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    console.log('Deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}
