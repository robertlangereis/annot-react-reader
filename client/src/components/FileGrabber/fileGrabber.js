import React, { useState, useReducer } from 'react'
import axios from 'axios'
import { Progress } from 'reactstrap'
import Annotations from '../Annotations/Annotations'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const { KEY } = require('./config')

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

  const dictionaryLookup = async vocaWord => {
    try {
      // fetch data from a url endpoint
      const lookupVocaWord = await axios({
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${vocaWord}/typeOf`,
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
          'x-rapidapi-key': `${KEY}`,
          useQueryString: true
        }
      })
        .then(response => {
          return response.data.typeOf
        })
        .catch(error => {
          console.log(error)
        })
      return lookupVocaWord
    } catch (error) {
      console.log('error', error)
      // appropriately handle the error
    }
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

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth }
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone }
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) }
      default:
        return state
    }
  }

  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: []
  })

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

  const handleDragEnter = e => {
    // console.log('e', e);
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 })
  }
  const handleDragLeave = e => {
    // console.log('e', e);
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 })
    if (data.dropDepth > 0) return
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
  }
  const handleDragOver = e => {
    // console.log('e', e);
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true })
  }
  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    let files = [...e.dataTransfer.files]
    // console.log('files', files);
    onChangeHandler(files)
    if (files && files.length === 1) {
      const existingFiles = data.fileList.map(f => f.name)
      files = files.filter(f => !existingFiles.includes(f.name))

      dispatch({ type: 'ADD_FILE_TO_LIST', files })
      e.dataTransfer.clearData()
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 })
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
    }
  }
  // const droppedFileElement = document.querySelector(".file__dropped");

  return (
    <div className='container'>
      <div className='form-group'>
        <ToastContainer />
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <form method='post' action='#' id='#'>
            <div className='form-group file color' name='form'>
              <label htmlFor='form'>Upload Your .annot File* </label>
              <span className='form-label'>
                {' '}
                *all the notes are kept in the Annotations folder under your
                digital editions folder and each book has it's own .annot file
              </span>
              <label
                className={
                  'data.inDropZone'
                    ? 'drag-drop-zone inside-drag-area file__box'
                    : 'drag-drop-zone file__box'
                }
                htmlFor='upload'
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
              >
                <label className='file__upload-text' htmlFor='upload'>
                  Choose .annot file to convert
                </label>
                <input
                  type='file'
                  id='upload'
                  name='upload'
                  accept='.annot'
                  required
                  onChange={onChangeHandler}
                />
                {data.fileList.map(f => {
                  if (selectedFiles)
                    return (
                      <li className='file__dropped' key={f.name}>
                        {f.name}
                      </li>
                    )
                })}
              </label>
              <div className='form-group'>
                <Progress max='100' color='success' value={loaded}>
                  {Math.round(loaded, 2)}%
                </Progress>
              </div>
              <button
                type='button'
                className='btn btn-success--darkmode btn-block'
                onClick={onClickHandler}
              >
                Upload
              </button>
              <button
                type='button'
                className='btn btn-primary--darkmode btn-block'
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
          dictionaryLookup={dictionaryLookup}
          title={document.title}
          author={document.author}
          texts={texts}
        />
      )}
    </div>
  )
}
