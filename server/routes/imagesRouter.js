const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController')
const authHelper = require('../middlewares/authHelper');

router.post('/', authHelper.isLogin, authHelper.isAuthUser, imagesController.postImage)
router.delete('/:id', authHelper.isLogin, authHelper.isAuthUser, imagesController.removeImage)
router.put('/:id', authHelper.isLogin, authHelper.isAuthUser, imagesController.updateImage)
router.get('/', imagesController.getImages)



module.exports = router
