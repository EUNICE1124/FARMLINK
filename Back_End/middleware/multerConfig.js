const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Ensure the upload folder exists automatically
const uploadDir = 'public/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Define Storage Logic
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save images to public/images
    },
    filename: (req, file, cb) => {
        // Create a unique name: timestamp + original filename
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 3. File Filter (Optional: Only allow images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;