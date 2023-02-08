import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

export const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
      cloudinary, 
      params: async (req,file) => {
        return {
          folder: 'whatsapp-clone'
        }
      }
    }),
    limits: { fileSize: 1024 * 1024 },
  }).single("avatar")