import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Comments from "../comment/comment";
import "./Image.css";
import LikeButton from "../LikesButton/LikesButton";

const Image = (props) => {
  const [searchParams] = useSearchParams();
  const imageSrc = searchParams.get("imageSrc");
  const imageId = searchParams.get("imageId");
  const username = searchParams.get("username");
  const dateAdded = new Date(searchParams.get("dateAdded")).toLocaleString();
  
    // Sets page title
    useEffect(() => {
      document.title = 'Image';
  }, []);

    useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <div className="image-container">
        <img src={imageSrc} alt="Selected Image" className="indvpageimage" />
        <div className="image-details">
          <p>Date Added: {dateAdded}</p>
          <p>Username: {username}</p>
          <div />
          <LikeButton imageId={imageId} />
          <Comments imageId={imageId} imageSrc={imageSrc} />
        </div>
      </div>
    </>
  );
};

export default Image;
