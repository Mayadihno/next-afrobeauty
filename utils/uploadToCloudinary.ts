import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define an interface for the Cloudinary upload result
interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any;
}

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (
  files: File[] | File,
  folder: string
): Promise<string[] | string | null> => {
  try {
    const fileArray = Array.isArray(files) ? files : [files];
    const uploadPromises = fileArray.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadStream = () => {
        return new Promise<CloudinaryUploadResult>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as CloudinaryUploadResult);
              }
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const uploadResult = await uploadStream();
      return uploadResult.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("Error uploading avatar to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
