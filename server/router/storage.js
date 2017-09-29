const express = require('express')
const router =  express.Router()
const images = require('../helpers/storage')
const storcont = require('../controllers/storage')
const db = require('../models/storage')

// const option = {
//   action: 'read',
//   expires: '03-17-2025'
// }


// router.get('/',function(req,res){
//   // console.log("masuk sini>>>>>>>");
//   bucket.getFiles({},(err,data)=>{
//     res.send(data.resourceId_)
//   })
// })

// router.get('/file', function(req,res){
//   storage.bucket('final-project123').getFiles().then(result=>{
//     const files = result[0]
//     // console.log(files)
//     // const link = parent.iam
//     files.forEach(file=>{
//       res.send(file.name)
//       // console.log(file)
//     })
//   }).catch(err=>{
//     res.send(err)
//   })
// })
//
// router.post('/gambar',function(req,res){
//   storage.bucket('final-project123').file(req.body.image).getSignedUrl(option).then(result=>{
//     const url = result[0]
//     res.send(url)
//   })
// })

router.post('/upload',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res) => {
    db.create({
      url: req.file.cloudStoragePublicUrl,
      filename: req.file.cloudStorageObject,
      type: req.file.mimetype
    }).then(data=>{
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  }).catch(err=>{
  res.send(err)
  })
})

router.get('/',(req,res)=>{
  db.find({},function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
})

module.exports = router;
