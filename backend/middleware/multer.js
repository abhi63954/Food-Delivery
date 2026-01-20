import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory for Cloudinary

const storage2=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
 })
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images are allowed"), false);
};
const upload = multer({ storage:storage2, fileFilter });




export default upload;