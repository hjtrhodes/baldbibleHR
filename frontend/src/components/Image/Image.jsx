import React from 'react';
import { useSearchParams } from "react-router-dom";
import Comments from "../comment/comment";
import './Image.css';
import LikeButton from '../LikesButton/LikesButton';


const Image = (props) => {
    const [searchParams] = useSearchParams();
    const imageSrc = searchParams.get("imageSrc");
    const imageId = searchParams.get("imageId");

    return (
        <>
            {/* <Comments imageId={imageId} imageSrc={imageSrc} />
            <img src={imageSrc} alt="Selected Image" /> */}
            <img src={imageSrc} alt="Selected Image" className='indvpageimage' />
            <div>
                <LikeButton imageId={imageId} />
            </div>
        </>
    );
};

export default Image;




// const Image = () => {
//   const [searchParams] = useSearchParams();
//   const imageSrc = searchParams.get('imageSrc');
//   const imageId = searchParams.get('imageId');

//   return (
//     <>
//       <h1>Image</h1>
//       <Comments imageId={imageId} imageSrc={imageSrc} />
//       <img src={imageSrc} alt="Selected Image" />
//     </>
//   );
// };

// export default Image;
