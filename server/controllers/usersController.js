const User = require('../models/User')
const jwt = require('jsonwebtoken')
const FB = require('fb')
require('dotenv').config()

var auth = (req, res) => {
  FB.api('/me', {fields: ['id','name','email'], access_token: req.headers.fbaccesstoken}, (response) => {
    console.log(response);
    User.findOne({fbId: response.id})
    .then(result => {
      if(result === null){
        console.log('user blm ada')
        User.create({
          name: response.name,
          email: response.email,
          fbId: response.id
        })
        .then(data =>{
          console.log('ini data', data);
          var userBaru = {
            id: data._id,
            fbId: data.fbId,
            email: data.email,
            name: data.name
          }
          console.log(userBaru)
          var token = jwt.sign(userBaru, process.env.JWT_SECRET)
          console.log('ini isinya token', token);
          res.send({token: token})
        })
        .catch(err =>{
          res.send(err)
        })
      } else {
        console.log('user dah ada ', result);
        var userLama = {
          id: result._id,
          fbId: result.fbId,
          email: result.email,
          name: result.name
        }
        // console.log('secret nya ', process.env.JWT_SECRET)
        var token = jwt.sign(userLama, process.env.JWT_SECRET)
        console.log('ini isinya token', token);
        res.send({token: token})
      }
    })
  })
}

// const register = (req, res) => {
//   FB.api('/me', {fields: ['id','name','email']}, (response) => {
//     // res.send(response)
//     console.log(response);
//
//     User.findOne({fbId: response.id})
//     .then(result => {
//       if(result.length === 0){
//         User.create({
//           name: response.name,
//           email: response.email,
//           fbId: response.id
//         })
//         .then(data =>{
//           var userBaru = {
//             id: data._id,
//             fbId: data.id,
//             email: data.email,
//             name: data.name
//           }
//           var token = jwt.sign(userBaru, process.env.JWT_SECRET)
//           console.log('ini isinya token', token);
//           res.send({token: token, name: data.name})
//         })
//         .catch(err =>{
//           res.send('ini eror login', err)
//         })
//       } else {
//         var userLama = {
//           id: result._id,
//           fbId: result.id,
//           email: result.email,
//           name: result.name
//         }
//         var token = jwt.sign(userLama, process.env.JWT_SECRET)
//         console.log('ini isinya token', token);
//         res.send({token: token, name: result.name})
//       }
//     })
//   })
// }

const getUsers = (req, res) => {
  User.find({})
  .then(users => res.send(users))
  .catch(err => res.send(err))
}


module.exports = {
  // register,
  auth,
  getUsers
}
