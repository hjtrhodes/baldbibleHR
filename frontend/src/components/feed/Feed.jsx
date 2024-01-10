import "./Feed.css";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../comment/comment";
import baseUrl from "../../../util/baseUrl";

const Feed = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/api/image`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImages(data.reverse()); // Reverse the array before setting in the state
      })
      .catch((error) => {
        console.error("Error fetching images:", error.message);
      });
  }, []);

  const showImage = (event, imageId) => {
    const imageSrc = event.target.src;
    navigate(`/image?imageSrc=${imageSrc}&imageId=${imageId}`);
  };
  return (
    <div id="image-layout-outer-box" className="image-layout">
      <Box
        id="image-layout-inner-box"
        sx={{ width: "400", overflowy: "scroll" }}
      >
        <ImageList id="image-list" variant="masonry" cols={3} gap={0}>
          {images.map((item) => (
            <ImageListItem key={item._id} id={`image-${item.img}`}className="image-column">
              <img
                src={`${item.imageUrl}`}
                alt={item.title}
                width={item.width}
                height={item.height}
                loading="lazy"
                style={{ height: `${item.height}px` }}
                onClick={(event) => showImage(event, item._id)} className="image"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
};

export default Feed;
