import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Comments from '../comment/comment';
import './Image.css';
import LikeButton from '../LikesButton/LikesButton';

const Image = (props) => {
  const [searchParams] = useSearchParams();
  const imageSrc = searchParams.get('imageSrc');
  const imageId = searchParams.get('imageId');

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <img src={imageSrc} alt="Selected Image" className="indvpageimage" />
      <div>
        <LikeButton imageId={imageId} />
        <Comments imageId={imageId} imageSrc={imageSrc} />
      </div>
    </>
  );
};

export default Image;





