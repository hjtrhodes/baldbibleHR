import likebutton from './static/like.png';
import { useState, useEffect } from 'react';
import './likeButton.css';
import LikeAmountDisplay from '../LikesAmountDisplay/LikesAmountDisplay';
import baseUrl from '../../../util/baseUrl';

const LikeButton = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [token, setToken] = useState(window.localStorage.getItem('token'));

    const updateLikesOnServer = async (newLikes) => {
        try {
        const response = await fetch(`${baseUrl}/api/auth/image/${props.image_id}/likes`, {
            method: 'put',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ likes : newLikes }),
        });
    
        if (response.ok) {
            const data = await response.json();
            window.localStorage.setItem('token', data.token);
        } else {
            console.error('Failed to update likes');
        }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
        }
    };

    const AddOrRemoveImageIdtoUserifLikedOrUnliked = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/user/likes`, {
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