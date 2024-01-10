import React from 'react';
import { useSearchParams } from "react-router-dom";
import Comments from "../comment/comment";


const Image = () => {

    const [searchParams] = useSearchParams();
    const imageSrc = searchParams.get("imageSrc");
    const imageId = searchParams.get("imageId");

    return <>
        <h1>Image</h1>
        <img src={imageSrc}></img>
        <Comments imageId={imageId} imageSrc={imageSrc} />
        
    </>
} 
    
export default Image
