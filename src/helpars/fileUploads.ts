import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import config from "../app/config";
import fs from 'fs';
import { CloudinaryAsset } from "../app/Interfaces/file";
import { UploadedFile } from "../app/Interfaces/UploadedFileType";

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
});
const upload = multer({ storage: storage });


const uploadToCloudinary = async (file: UploadedFile): Promise<CloudinaryAsset | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: CloudinaryAsset) => {
                fs.unlinkSync(file.path)
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )
    });
};

export const Fileuploader = {
    upload,
    uploadToCloudinary
};