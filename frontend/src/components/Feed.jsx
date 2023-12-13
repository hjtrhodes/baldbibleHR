import React from 'react'
import './Feed.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const Feed = () => {

    // to be replaced with seed data
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1624395213043-fa2e123b2656?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Bed',
        },
        {
            img: 'https://images.unsplash.com/photo-1556135063-800a4cfe3206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Books',
        },
        {
            img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Sink',
        },
        {
            img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsZCUyMG1lbnxlbnwwfDF8MHx8fDA%3D',
            title: 'Kitchen',
        },
        {
            img: 'https://images.unsplash.com/photo-1589279715734-6631a314dfa2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsZCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
            title: 'Blinds',
        },
        {
            img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
            title: 'Chairs',
        },
        {
            img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
            title: 'Laptop',
        },
        {
            img: 'https://images.unsplash.com/photo-1444069069008-83a57aac43ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhbGQlMjBtZW58ZW58MHwxfDB8fHww',
            title: 'Doors',
        },
        {
            img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
            title: 'Storage',
        },
        {
            img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
            title: 'Candle',
        },
        {
            img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
            title: 'Coffee table',
        },
    ];
    
    //Box, ImageList and ImageListItem are comonents from the @mui library
    return (
        <Box sx={{ width: "100", overflowy: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
            <ImageListItem key={item.img}>
                <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                />
            </ImageListItem>
            ))}
        </ImageList>
        </Box>
    );
    }


export default Feed