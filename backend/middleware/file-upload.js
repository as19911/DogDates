const multer = require("multer");
const uuid = require("uuid");
const fs = require('fs');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync('upload/pictures')){
        fs.mkdirSync('upload/pictures');
      }
      callback(null, "upload/pictures");
    },
    fileName: (req, file, callback) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    callback(error, isValid);
  },
});

module.exports = fileUpload;
