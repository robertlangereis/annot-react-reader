import React, { useState } from 'react'
import axios from 'axios'
import { Progress } from 'reactstrap'
import Annotations from '../Annotations/Annotations'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './fileGrabber.css'

export default function FileGrabber () {
  const [texts, setTexts] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [loaded, setLoaded] = useState(null)
  const [document, setDocument] = useState(null)
  const [convertComplete, setConvertComplete] = useState(false)
  const convertUpload = annotationObject => {
    setDocument(annotationObject)
    const array = []
    annotationObject.annotations.forEach(item => {
      array.push(item.target.fragment.text)
    })
    return setTexts(array)
  }

  const maxSelectFile = files => {
    if (files.length > 1) {
      setSelectedFiles(null) // discard selected file(s)
      toast.error('Only 3 images can be uploaded at a time')
      return false
    }
    return true
  }

  const checkFileSize = files => {
    const maxSize = 150000
    const filesTooBig = Array.from(files).every(file => file.size > maxSize)
    if (filesTooBig) {
      setSelectedFiles(null) // discard selected file(s)
      toast.error(
        '(One of) the uploaded file(s) is too large, please pick a smaller file\n'
      )
      return false
    }
    return true
  }

  const checkMimeType = files => {
    const isAnnotFile = Array.from(files)
      .map(file => {
        const lastDot = file.name.lastIndexOf('.')
        const ext = file.name.substring(lastDot + 1)
        return ext
      })
      .every(ext => ext === 'annot')
    if (!isAnnotFile) {
      setSelectedFiles(null) // discard selected file(s)
      toast.error('This webapplication only supports .annot format files')
      return false
    }
    return true
  }

  const onChangeHandler = event => {
    const files = event.target.files
    if (maxSelectFile(files) && checkMimeType(files) && checkFileSize(files))
      setSelectedFiles(files)
    setLoaded(0)
  }

  const onClickHandler = () => {
    let data = new FormData()
    selectedFiles &&
      Array.from(selectedFiles).forEach(file => data.append('file', file))
    if (selectedFiles !== null)
      axios
        .post('/upload', data, {
          onUploadProgress: ProgressEvent => {
            setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
          }
        })
        .then(res => {
          toast.success('upload success')
        })
        .catch(err => {
          toast.error('upload fail')
          console.error(err)
        })
    else toast.error('upload fail')
  }
  const onClickConverter = () => {
    if (selectedFiles !== null)
      axios
        .post('/convert', {
          onUploadProgress: ProgressEvent => {
            setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
          }
        })
        .then(res => {
          const annotationObject = {
            title: res.data.publication['dc:title'],
            author: res.data.publication['dc:creator'],
            annotations: res.data.annotation
          }
          convertUpload(annotationObject)
          setConvertComplete(true)
          toast.success('upload success')
        })
        .catch(err => {
          toast.error('upload fail')
          console.error(err)
        })
    else toast.error('upload fail')
  }

  return (
    <div className='container'>
      <div className='form-group'>
        <ToastContainer />
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <form method='post' action='#' id='#'>
            <div className='form-group files color'>
              <label htmlFor='files'>Upload Your .annot File* </label>
              <span className="form-label"> *all the notes are kept in the Annotations folder under your digital editions folder and each book has it's own .annot file</span>
              <input
                type='file'
                name='file'
                multiple
                onChange={onChangeHandler}
              />
              <div className='form-group'>
                <Progress max='100' color='success' value={loaded}>
                  {Math.round(loaded, 2)}%
                </Progress>
              </div>
              <button
                type='button'
                className='btn btn-success btn-block'
                onClick={onClickHandler}
              >
                Upload
              </button>
              <button
                type='button'
                className='btn btn-primary btn-block'
                onClick={onClickConverter}
              >
                Convert
              </button>
            </div>
          </form>
        
        </div>
      </div>
      {convertComplete && texts && (
        <Annotations
          title={document.title}
          author={document.author}
          texts={texts}
        />
      )}
    </div>
  )
}
