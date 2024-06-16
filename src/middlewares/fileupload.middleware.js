import multer from "multer"

// handle post media
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        console.log(req);
        cb(null, './uploads/');
    },

    filename:(req, file, cb) => {
        console.log(req, file);
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }

})

export const upload = multer({storage:storage})

