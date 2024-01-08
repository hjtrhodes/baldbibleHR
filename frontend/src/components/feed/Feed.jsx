import './Feed.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import GetImages from '../getImages/GetImages';


const Feed = ({navigate}) => {

    // to be replaced with seed data
    const itemData = [
        {
            imageId: '1',
            img: 'https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Bed',
            height: "300", 
        },
        {
            imageId: '2',
            img: 'https://images.unsplash.com/photo-1556135063-800a4cfe3206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Books',
            height: "400", 
        },
        {
            imageId: '3',
            img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Sink',
            height: "400", 
        },
        {
            imageId: '4',
            img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Kitchen',
            height: "400", 
        },
        {
            imageId: '5',
            img: 'https://images.unsplash.com/photo-1589279715734-6631a314dfa2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsZCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
            title: 'Blinds',
            height: "200", 
        },

        
    ];
    const showImage = (event, imageId) => {
        const imageSrc = event.target.src;
        navigate(`/image?imageSrc=${imageSrc}&imageId=${imageId}`)
    }
    return (
        <div id="image-layout-outer-box" className="image-layout">
        <Box id="image-layout-inner-box" sx={{ width: "400", overflowy: 'scroll' }}>
        <ImageList id="image-list" variant="masonry" cols={3} gap={0}>
            {itemData.map((item) => (
            <ImageListItem key={item.img} id={`image-${item.img}`} >
                <img
                
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
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