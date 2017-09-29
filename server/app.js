const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const logger = require('morgan');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:123@cluster0-shard-00-00-jgxqq.mongodb.net:27017,cluster0-shard-00-01-jgxqq.mongodb.net:27017,cluster0-shard-00-02-jgxqq.mongodb.net:27017/mininsta?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
mongoose.connect('mongodb://localhost/mininsta', function(){
    /* Drop the DB */
    // mongoose.connection.db.dropDatabase();

    // Drop the 'users' collection from the current database
    // mongoose.connection.db.dropCollection('users', function(err, result) {
    //   if(!err) {
    //     console.log('berhasil drop collection users');
    //   }
    // });
})
const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = require('./routes/usersRouter')
const img = require('./routes/imagesRouter')

app.use('/', user)
app.use('/images', img)


app.listen(process.env.PORT || 3000, () => {
  console.log('Listening Port 3000');
})
