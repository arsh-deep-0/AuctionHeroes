import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //uploaded successfully
    console.log("file uploaded successfully on cloudinary", response);
    fs.unlinkSync(localFilePath);
    console.log("file unlinked: ",localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);//remove the locally temporary saved file as file upload failed
  }
};

export {uploadOnCloudinary}