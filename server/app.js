const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const Storage = require('@google-cloud/storage')
const simpan = Storage()

const logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://dimasgardenia:dimas1990@rest-api-shard-00-00-fmugy.mongodb.net:27017,rest-api-shard-00-01-fmugy.mongodb.net:27017,rest-api-shard-00-02-fmugy.mongodb.net:27017/test?ssl=true&replicaSet=Rest-API-shard-0&authSource=admin');

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
