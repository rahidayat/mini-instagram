var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  fbId: String
  },{
  timestamps: true
});

var User = mongoose.model('users', userSchema);

module.exports = User
