import './Feed.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import GetImages from '../getImages/GetImages';


const Feed = () => {

    // to be replaced with seed data
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Bed',
            height: "300", 
        },
        {
            img: 'https://images.unsplash.com/photo-1556135063-800a4cfe3206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Books',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Sink',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Kitchen',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1589279715734-6631a314dfa2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsZCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
            title: 'Blinds',
            height: "200", 
        },
        {
            img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
            title: 'Chairs',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
            title: 'Laptop',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1444069069008-83a57aac43ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhbGQlMjBtZW58ZW58MHwxfDB8fHww',
            title: 'Doors',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
            title: 'Coffee',
            height: "300", 
        },
        {
            img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
            title: 'Storage',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
            title: 'Candle',
            height: "400", 
        },
        {
            img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
            title: 'Coffee table',
            height: "400", 
        },
    ];

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