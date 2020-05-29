import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Progress } from 'reactstrap'
import Annotations from '../Annotations/Annotations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './fileGrabber.css'


export default function FileGrabber () {
  const [selectedFiles, setSelectedFiles] = useState(null)

  const [loaded, setLoaded] = useState(null)
  const [document, setDocument] = useState(null)
  const [voca, setVoca] = useState([])
  const [annotationItem, setAnnotationItem] = useState('')
  const [texts, setTexts] = useState([])
  const [convertComplete, setConvertComplete] = useState(false)
  // const [annotationTexts, setAnnotationTexts] = useState(null)
  // const [count, setCount] = useState(0);

  useEffect(() => {
    
    }, [document, voca, texts]);
  
  const convertUpload = (annotationObject)=>{ 
    annotationObject.annotations.forEach(item => {
      setAnnotationItem(item.target.fragment.text)
      console.log('item.target.fragment.text', item.target.fragment.text);
      console.log('annotationItem', annotationItem);
      setConvertComplete(true)
      // console.log('item', );
      const wordCount= (str)=> { 
          return str.split(" ").length;
        }
      const wordLength = wordCount(annotationItem)
      // console.log('annotationItem', annotationItem);
      // console.log('annotationItem', typeof annotationItem);
      // console.log('wordLength', wordLength);
      if(wordLength < 2) setVoca([...voca, annotationItem])
      else setTexts([...texts, annotationItem])
      setAnnotationItem('')
  })

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
    const maxSize = 15000
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
      toast.error(
        'This webapplication only supports .annot format files'
      )
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
    selectedFiles && Array.from(selectedFiles).forEach(file => data.append('file', file))
    if(selectedFiles !==null)axios
      .post('http://localhost:8000/upload', data, {
        onUploadProgress: ProgressEvent => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
        }
      })
      .then(res => {
        toast.success('upload success')
        // console.log(res.statusText)
      })
      .catch(err => { 
        toast.error('upload fail')
        console.error(err)

    })
    else toast.error('upload fail')
  }
  const onClickConverter = () => {
    if(selectedFiles !==null)axios
      .post('http://localhost:8000/convert', {
        onUploadProgress: ProgressEvent => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
        }
      })
      .then(res => {
        // res.data.map(item => console.log(item))
        // res.data
        // console.log('res.data', res.data);
        // console.log('res.data.publication.title', res.data.publication['dc:title']);
        // console.log('res.data.publication.author', res.data.publication['dc:creator']);
        // console.log('res.data.annotation', res.data.annotations);
        const annotationObject = {
          title: res.data.publication['dc:title'],
          author: res.data.publication['dc:creator'],
          annotations: res.data.annotation
        }
        setDocument(annotationObject)
        convertUpload(annotationObject)
        toast.success('upload success')
        // console.log(res.statusText)
      })
      .catch(err => { 
        toast.error('upload fail')
        console.error(err)

    })
    else toast.error('upload fail')
  }

  return (
    <div className='container'>
      <div className="form-group">
       <ToastContainer />
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <form method='post' action='#' id='#'>
            <div className='form-group files color'>
              <label htmlFor="files">Upload Your File </label>
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
          {convertComplete && <Annotations title={document.title} author={document.author} voca={voca} text={texts}/>}
          {/* {document && console.log('document', document)} */}
        </div>
      </div>
    </div>
  )
}
