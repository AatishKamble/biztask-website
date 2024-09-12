import multer from "multer";


const storage=multer.diskStorage({});

const isImage=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true);
    }else {
        cb(new Error('Only image files are allowed!'), false);  
      }
}

const upload=multer({
storage:storage,
fileFilter:isImage
});

export default upload;