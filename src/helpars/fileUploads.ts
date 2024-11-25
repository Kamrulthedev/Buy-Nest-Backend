import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import config from "../app/config";
import fs from 'fs';


// Configuration
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret
}); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });


const uploadToCloudinary = async (file: any) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(file.path, { public_id: file.filename });
        console.log(uploadResult);
        fs.unlinkSync(file.path);
        return uploadResult;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw error;
    }
};

export const Fileuploader = {
    upload,
    uploadToCloudinary
};