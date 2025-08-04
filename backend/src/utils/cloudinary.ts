import cloudinary from "../config/cloudinary"

export const uploadImage = async(image:string)=>{
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "Boom_Shop-images",
      resource_type: "image",
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });
    return uploadedImage.secure_url;
}
