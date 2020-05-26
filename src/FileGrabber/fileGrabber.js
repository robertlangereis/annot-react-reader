import React, {useState} from 'react'
import './fileGrabber.css'

export default function FileGrabber() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loaded, setLoaded] = useState(null)
  const onChangeHandler = event=> {
    setSelectedFile(event.target.files[0])
    setLoaded(0)
}
    return (
<div className="container">
<div className="row">
	   <div className="col-md-6">
	      <form method="post" action="#" id="#">
              <div className="form-group files color">
                <label>Upload Your File </label>
                <input type="file" name="file" onChange={onChangeHandler}/>
              </div>
          </form>
	  </div>
	</div>
</div>
    )
}
