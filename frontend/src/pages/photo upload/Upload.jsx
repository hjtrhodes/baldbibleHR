import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedIMG, setUpload] = useState("");

  useEffect(() => {
    console.log(image);
  }, [image]);

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
      const result = await axios.post("http://localhost:8080/upload", {
        image: image,
      });
      const uploadedIMG = result.data.public_id;
      window.location.reload(); // set this to navigate to homepage plus image uploaded pop up box.
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container mt-5 align-items-center justify-content-center">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="fileInput"> Upload your photo here</label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => handleChange(e)}
            required
            accept="image/png, image/jpeg, image/jpg, image/jfif"
          />
          <button className="btn btn-primary">submit </button>
        </form>
      </div>
      <img src={image} alt="" />
    </>
  );
};

export default Upload;
