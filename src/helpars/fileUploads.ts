import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';


    // Configuration
    cloudinary.config({ 
        cloud_name: 'dak98cpxr', 
        api_key: '862687512999954', 
        api_secret: 'e_p7JvI_OlNh7d1qqg9V2WhGhcU' 
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


const uploadToCloudinary = async(file : any) =>{
    (async function() {
        // Upload an image
         const uploadResult = await cloudinary.uploader
           .upload(
               'E:\Next\L-2-W.D.C-PH\Misson-6-MYSQL\PH HealthCare\PH HealthCare-Server/uploads/my.jpg', {
                   public_id: 'shoes',
               }
           )
           .catch((error) => {
               console.log(error);
           });
        
        console.log(uploadResult);
        
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        console.log(optimizeUrl);
        
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        
        console.log(autoCropUrl);    
    })();
};


export const Fileuploader = {
  upload,
  uploadToCloudinary
};