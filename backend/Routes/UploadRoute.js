const express = require('express');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single("file"), (req, res) => {
    try {
        res.status(200).json("File Upload Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Error uploading file");
    }
});

module.exports = router;
