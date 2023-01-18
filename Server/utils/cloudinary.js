import cloudinaryImport from "cloudinary";

cloudinaryImport.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkjjkr88j",
  api_key: process.env.CLOUDINARY_API_KEY || "364567264957887",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "18skwau937JL8otzzYIcRJN3J4A",
});

export default cloudinaryImport;
