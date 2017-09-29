const Image = require ('../models/Image');

const postImage = (req, res) => {
  Image.create(req.body)
  .then(() => {
    res.send({msg:`tambah gambar berhasil`})
  })
  .catch(err => {
    return res.status(400).send({msg: err.message})
  })
}

const getImages = (req, res) => {
  Image.find({})
  .then(images => res.send(images))
  .catch(err => res.send({msg: err.message}))
}

const removeImage = function (req, res) {
 Image.deleteOne({
   _id: req.params.id
 })
 .then(() => res.send({msg: 'image berhasil dihapus'}))
 .catch(err => res.send({msg: err.message}))
}

const updateImage = function (req, res) {
 Image.update({_id: req.params.id}, req.body)
 .then(() => res.send({msg: 'image berhasil diupdate'}))
 .catch(err => res.send({msg: err.message}))
}


module.exports = {
  postImage,
  getImages,
  removeImage,
  updateImage
}
