import multer from "multer";
import path from "path";

/**
 * Multer configuration for handling file uploads.
 * Stores files in the 'uploads/' directory.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Create unique filename: timestamp + original name
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

/**
 * File filter to ensure only PDF and DOCX files are uploaded.
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|docx|doc/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (extname) {
    return cb(null, true);
  }
  cb(new Error("Error: Only PDF and DOC/DOCX files are allowed!"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
