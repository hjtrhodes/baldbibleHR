import './Feed.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import GetImages from '../getImages/GetImages';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Comments from '../comment/comment';



const Feed = () => {
    const [images, setImages] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:8080/api/images", {
        })
            .then(response => response.json())
            .then(data => {
    
            setImages(data);
            })
    
        // } 
    }, [])
    console.log(images);

    const showImage = (event, imageId) => {
        const imageSrc = event.target.src;
        navigate(`/image?imageSrc=${imageSrc}&imageId=${imageId}`)
    }
    return (
        <div id="image-layout-outer-box" className="image-layout">
        <Box id="image-layout-inner-box" sx={{ width: "400", overflowy: 'scroll' }}>
        <ImageList id="image-list" variant="masonry" cols={3} gap={0}>
            {images.map((item) => (
            <ImageListItem key={item.img} id={`image-${item.img}`} >
                <img
                
                
                src={`${item.imageURL}`}
                alt={item.title}
                width={item.width}
                height={item.height}
                loading="lazy"
                style={{ height: `${item.height}px` // this will change the height of the image based on likes/upvotes
                    }}
                        
                onClick={showImage}
                />
            </ImageListItem>
            ))}
        </ImageList>
        {/* <GetImages /> */}
        </Box>
        </div>
    );
    }


export default Feed