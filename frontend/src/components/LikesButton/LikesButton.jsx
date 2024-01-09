import likebutton from './static/like.png';
import { useState, useEffect } from 'react';
import './likeButton.css';
import LikeAmountDisplay from '../LikesAmountDisplay/LikesAmountDisplay';
import baseUrl from '../../../util/baseUrl';



//Make one request to the backend - Is the UserID in the array of liked images? Yes - remove it, No - add it. Display array length as likes amount


const LikeButton = (props) => {

    // const checkIfUserHasLikedImage = async () => {
    //     try {
    //     const response = await fetch(`${baseUrl}/api/auth/image/${props.image_id}/likes`, {
    //         method: 'put',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({ likes : newLikes }),
    //     });
    
    //     if (response.ok) {
    //         const data = await response.json();
    //         window.localStorage.setItem('token', data.token);
    //     } else {
    //         console.error('Failed to update likes');
    //     }
    //     } catch (error) {
    //         console.error('Error in fetching or parsing data:', error);
    //     }
    // };

    const checkIfUserHasLikedImage = async () => {
    try {
        const response = await fetch(`${baseUrl}api/auth/${props.image_id}/likes`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ imageId: props.image_id }),
        });

        if (response.ok) {
        const data = await response.json();
            if (data.imageIsLiked === true) {
                setIsLiked(true)
                setLikes(1);
            } 
            else if (
                data.imageIsLiked === false
            ) {
                setIsLiked(false) 
                setLikes(-1);
            } 
        } else {
        console.error('Failed to check if liked');
        }
    } catch (error) {
        console.error('Error in fetching or parsing data:', error);
    }
};

useEffect(() => {
    updateLikesOnServer(likes);
}, [likes]);


    const handleSubmitLikes = async (e) => {
    e.preventDefault();
        AddOrRemoveImageIdtoUserifLikedOrUnliked()
    };

    return (
    <>
        <form onSubmit={handleSubmitLikes}>
            <button
            className='likeButton'
            type='submit'
            onClick={handleSubmitLikes}
            >
            <img src={likebutton} alt='Like' />
            </button><br />
            <LikeAmountDisplay likes={ likes } image_id={ props.image_id } />
        </form>
    </>
    );
};

export default LikeButton;