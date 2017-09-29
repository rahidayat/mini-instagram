const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const logger = require('morgan');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:123@cluster0-shard-00-00-jgxqq.mongodb.net:27017,cluster0-shard-00-01-jgxqq.mongodb.net:27017,cluster0-shard-00-02-jgxqq.mongodb.net:27017/mininsta?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
mongoose.connect('mongodb://localhost/mininsta');
const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = require('./routes/usersRouter')

app.use('/', user)


app.listen(process.env.PORT || 3000, () => {
  console.log('Listening Port 3000');
})
