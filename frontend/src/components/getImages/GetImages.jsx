import { useEffect, useState } from 'react';
import LikeButton from '../LikesButton/LikesButton';
import "./GetImages.css"


const GetImages = ({ }) => {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    // if(token) {
      fetch("http://localhost:8080/api/images", {
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
        <>
        <div className='image'>
          {images.map(imgData => <img src={imgData.imageURL} className='image'></img>)}
          
        </div>
        <div className='likebutton' >
          <LikeButton image_id={ images._id }/>
        </div>
        </>
      )
}

export default GetImages;