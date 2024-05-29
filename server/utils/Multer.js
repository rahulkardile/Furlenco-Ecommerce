import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        return cb(null, "./uploads/poster");
    },
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}_name_${file.originalname}`);
    }
})

export const upload = multer({ storage });