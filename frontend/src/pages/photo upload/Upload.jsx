import react from 'react'
import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState("")
  const [image, setImage] = useState("")

  const previewFiles= (file) => {
    const reader = new FileReader() 
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImage(reader.result) 
    }
    console.log(image);
  }
  
  const handleChange = (e) => { 
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
    // setfile(e.target.files)
  }
  const handleSubmit = () => { 
    // console.log(e.target.files)
    // setfile(e.target.files)
  }
  return (
    <>
    <div className="container mt-5 align-items-center justify-content-center">
    <form onSubmit={e=> handleSubmit(e)}>
        <label htmlFor= "fileInput"> Upload your photo here</label>
          <input type="file" id="fileInput" onChange={e=> handleChange(e)} required  
          accept="image/png, image/jpeg, image/jpg, image/jfif"/> 
          <button className="btn btn-primary">submit </button>
    </form>
    </div>
    <img src={image} alt="" /> 
    </>
)
};

export default Upload;