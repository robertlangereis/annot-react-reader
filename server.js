const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const parser = require('xml2json')
// const util = require('util');

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

// app.post('/upload',(req, res) => {
//   upload(req, res, (err) => {
//            if (err instanceof multer.MulterError) {
//                return res.status(500).json(err)
//            } else if (err) {
//                return res.status(500).json(err)
//            }
//       return res.status(200).send(req.file)
//     })
// });

app.post('/convert', async (req, res) => {
  const ret = new Promise((resolve, reject) => {
    fs.readdirSync('./annot').forEach(file => {
      if(file === '.gitignore') return
      const path = `./annot/${file}`
      return fs.readFile(path, 'utf8', function (err, data) {
        if (err) return reject(err)
        const json = parser.toJson(data)
        const fileObject = JSON.parse(json)
        fs.unlink(path, err => {
          if (err) {
            console.error(err)
            return
          }

          //file removed
        })
        resolve(fileObject && fileObject.annotationSet)
      })
    })
  })
  try {
    res.status(200).send(await ret)
    // console.log(ret, 'ret')
  } catch (error) {
    console.log(error)
  }
  // return skimfiles

  // console.log('skimfiles', skimfiles);
  // console.log('obj', obj);
  // const sendObject = obj.map(file => file.annotationSet.publication)
  //  const response = res.status(200).send(sendObject)
  //  return response
  // fs.readFile('./annot', [encoding], [callback]);
})
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`))
