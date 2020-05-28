const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const fs = require('fs').promises;
const parser = require('xml2json')
const util = require('util');


app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/annot')
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
    const fileNames = fs.readFile('./public/annot/')
    resolve(fileNames)
  })
    .then(result => {
      // const arr = []
      const readFile = async (title) => await fs.readFile(`./public/annot/${title}`, 'utf8', (err, data) => {
        if (err) return console.log(err)
        const json = parser.toJson(data)
        const fileObject = JSON.parse(json)
        console.log('fileObject', fileObject);
        return fileObject
      })
      const files = result.map(async title => await readFile(title))
      console.log('files', files);
      return files
    })
    .then(result => {
      console.log('resultFinal', result)
      res.status(200).send(result)
      // return result
    })
    .catch(err => console.error(err))
    return ret
  })
  // try {
  //   res.status(200).send(await ret)
  //   // console.log(ret, 'ret')
  // } catch (error) {
  //   console.log(error)
  // }
  // return skimfiles

  // console.log('skimfiles', skimfiles);
  // console.log('obj', obj);
  // const sendObject = obj.map(file => file.annotationSet.publication)
  //  const response = res.status(200).send(sendObject)
  //  return response
  // fs.readFile('./public/annot', [encoding], [callback]);
// })

app.listen(8000, () => console.log('App running on port 8000'))
