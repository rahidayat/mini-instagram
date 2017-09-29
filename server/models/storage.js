const mongoose = require('mongoose')
const Schema = mongoose.Schema

let StorageSchema = new Schema({
  url : String,
  filename: String,
  type: String
})

var db = mongoose.model('db', StorageSchema)

module.exports = db
