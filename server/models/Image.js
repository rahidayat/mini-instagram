var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  url: String,
  filename: String,
  type: String
  },{
  timestamps: true
});

var Image = mongoose.model('images', imageSchema);

module.exports = Image
