const express = require('express')
const path = require('path');
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const parser = require('xml2json')
const port = process.env.PORT || 5000;


const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Avoid CORS blocking 
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './annot')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).array('file')

  app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

app.post('/convert', async (req, res) => {
  const ret = new Promise((resolve, reject) => {
    fs.readdirSync('./annot').forEach(file => {
      if(file === '.gitignore') return
      const path = `./annot/${file}`
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) return reject(err)
        const json = parser.toJson(data)
        const fileObject = JSON.parse(json)
        // console.log('fileObject', fileObject);
        resolve(fileObject && fileObject.annotationSet)
      })
      return fs.unlink(path, err => {
        if (err) {
          console.error(err)
          return
        }
        //file removed
      })
    })
  })
  try {
    res.status(200).send(await ret)
  } catch (error) {
    console.log(error)
  }
})
// const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`App running on port ${port}`))
