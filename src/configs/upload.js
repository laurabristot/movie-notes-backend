const path = require('path');
const multer = require('multer');
const crypto = require('crypto')

const TMP_folder = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_folder, "uploads")

const MULTER = {
  storage: multer.diskStorage({
    destination:  TMP_FOLDER,
    fileName(req, file, cb){
      const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`
      return cb(null, fileName)
    }
  })
}

module.exports = {
  TMP_folder,
  UPLOADS_FOLDER,
  MULTER
}