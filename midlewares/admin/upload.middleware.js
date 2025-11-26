const multer  = require('multer');
const path = require("path");

// Folder lưu ảnh: /public/uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");  
    },
    filename: (req, file, cb) => {
        const unique = file.originalname.split(".")[0] + "-" + Date.now();
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;