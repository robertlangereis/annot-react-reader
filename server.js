var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage }).array('file')

app.post('/upload',(req, res) => {
    upload(req, res, (err) => {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});

app.listen(8000, () => console.log('App running on port 8000'));