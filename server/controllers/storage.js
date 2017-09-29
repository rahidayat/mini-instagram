const db = require('../models/storage')
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

let createLink = (req,res)=>{
  db.create({
    url: req.file.cloudStoragePublicUrl,
    filename: req.file.cloudStorageObject,
    type: req.file.mimetype
  }).then(data=>{
    res,send(data)
  })
}

module.exports = {
  createLink
}
