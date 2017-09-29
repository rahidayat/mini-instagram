var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  imgurl: String,
  uploadBy: [{type: Schema.Types.ObjectId, ref: 'users'}]
  },{
  timestamps: true
});

var Image = mongoose.model('images', imageSchema);

module.exports = Image
