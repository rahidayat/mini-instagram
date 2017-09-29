const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const Storage = require('@google-cloud/storage')
const simpan = Storage()

const logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db');

const stor = require('./router/storage')

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',stor)


app.listen(process.env.PORT || 3000, () => {
  console.log('Listening Port 3000');
})
