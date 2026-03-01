import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No file path provided");
      return null;
    }

    // Configure cloudinary inside function (safe order)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Uploading file:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("Upload success:", response.secure_url);

    // Optional: delete local file after upload
    fs.unlinkSync(localFilePath);

    return response;

  } catch (error) {
console.error("Cloudinary Upload Error FULL:", error);    return null;
  }
};

export default uploadOnCloudinary;