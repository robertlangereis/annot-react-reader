import React, { useState } from 'react'
import axios from 'axios'
import './fileGrabber.css'

export default function FileGrabber () {
  const [selectedFiles, setSelectedFiles] = useState(null)
  
  const [loaded, setLoaded] = useState(null)
  
  const maxSelectFile= event =>{
    let files = event.target.files // create file object
    if (files.length > 3) { 
      const msg = 'Only 3 images can be uploaded at a time'
      event.target.value = null // discard selected file
      console.log(msg)
      return false;
    }
    return true;
  }
  
 

  const checkMimeType= event =>{
    //getting file object
    let files = event.target.files 
    
    let fileNames = []
    let extensions = []
    Array.from(files).forEach(file =>{
      const name = file.name;
      const lastDot = name.lastIndexOf('.')
      const fileName = name.substring(0, lastDot);
      const ext = name.substring(lastDot + 1);
      fileNames.push(fileName)
      extensions.push(ext)
    })
    let err = 'This webapplication only supported files with .annot format\n'
    if(extensions.map(ext => ext !== 'annot')) {
      console.log(err)
      return false
    }
    return true
  }

  const onChangeHandler = event => {
    if(maxSelectFile(event) && checkMimeType(event)) setSelectedFiles(event.target.files)
    setLoaded(0)
  }

  const onClickHandler = () => {
    const data = new FormData()
    Array.from(selectedFiles).forEach(file =>
      data.append('file', file)
    )
    axios
      .post('http://localhost:8000/upload', data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText)
      })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <form method='post' action='#' id='#'>
            <div className='form-group files color'>
              <label>Upload Your File </label>
              <input
                type='file'
                name='file'
                multiple
                onChange={onChangeHandler}
              />
              <button
                type='button'
                className='btn btn-success btn-block'
                onClick={onClickHandler}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
