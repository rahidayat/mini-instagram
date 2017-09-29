const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
const FB = require('fb');
// const fb = new FB.Facebook({version: 'v2.10'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

// router.get('/login', usersController.register)
router.get('/', setAccessToken, usersController.auth)
router.get('/users', usersController.getUsers)



module.exports = router