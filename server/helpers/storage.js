const Storage = require('@google-cloud/storage')
const projectId = process.env.PROJ_ID
require('dotenv').config()
const bucketName = process.env.BUCK_NAME
const mongoose = require('mongoose')
const storage = Storage({
  projectId:process.env.PROJ_ID,
  keyFilename:process.env.KEY_FILE
})
const bucket = storage.bucket(process.env.BUCK_NAME)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${bucketName}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

const gcsname = Date.now() + req.file.originalname
const file = bucket.file(gcsname)


const stream = file.createWriteStream({
  metadata: {
    contentType: req.file.mimetype
    }
  })

stream.on('error', (err) => {
  req.file.cloudStorageError = err
  next(err)
})

stream.on('finish', () => {
  req.file.cloudStorageObject = gcsname
   file.makePublic().then(() => {
     req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
     console.log("masuk Help>>>>>>>>>>>>>");
      next()
    })
  })
  stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })


module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
