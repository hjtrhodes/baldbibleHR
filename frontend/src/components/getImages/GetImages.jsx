import { useEffect, useState } from 'react';
import "./GetImages.css"


const GetImages = ({ }) => {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    // if(token) {
      fetch("http://localhost:8080/api/image", {
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // }
      })
        .then(response => response.json())
        .then(data => {
          // window.localStorage.setItem("token", data.token)
          // setToken(window.localStorage.getItem("token"))

          setImages(data);
        })

    // } 
  }, [])


  
      return(
        <div className='image'>
        {images.map(imgData => (
          <div key={imgData._id}>
            <img src={imgData.imageURL} className='image' />
            {/* <div className='likebutton'>
              <LikeButton image_id={imgData._id} />
            </div> */}
          </div>
        ))}
      </div>
      )
}

export default GetImages;