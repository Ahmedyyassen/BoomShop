import { Request } from "express"
import multer, { FileFilterCallback } from "multer"

type UploadParams=(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
)=> void
const storage = multer.memoryStorage();

const fileFilter: UploadParams = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
} 

const upload = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    }
})
export default upload;