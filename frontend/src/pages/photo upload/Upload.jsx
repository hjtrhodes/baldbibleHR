import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../../util/baseUrl";
import "./Upload.css"

const Upload = ({ navigate }) => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedIMG, setUpload] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userId = window.localStorage.getItem("userId");
  const username = window.localStorage.getItem("username");

  useEffect(() => {
    console.log(image);
  }, [image]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${baseUrl}/api/image/upload`, {
        image,
        userId,
        username,
      });
      const uploadedIMG = result.data.public_id;
      navigate('/') 
      alert("image uploaded sucsessfully") // set this to navigate to homepage plus image uploaded pop up box.
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="center-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <strong>
        <label htmlFor="fileInput"><h2>Upload your photo here</h2></label>
        </strong>
        <input
          classname='input-btn'
          type="file"
          id="fileInput"
          onChange={(e) => handleChange(e)}
          required
          accept="image/png, image/jpeg, image/jpg, image/jfif"
        />
        <button className="btn btn-primary">Submit</button>
      </form>
      <img src={image} alt="" />
    </div>
  );
  
};

export default Upload;
