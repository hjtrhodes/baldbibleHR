import likebutton from './static/like.png';
import { useState } from 'react';
import './likeButton.css';
import LikeAmountDisplay from '../LikesAmountDisplay/LikesAmountDisplay';
import baseUrl from '../../../util/baseUrl';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout/Logout';

const LikeButton = (props) => {
    const [reRender, setReRender] = useState("");
    const navigate = useNavigate();

    const checkIfUserHasLikedImage = async () => {
        try {
            const userId = window.localStorage.getItem("userId");
            const token = window.localStorage.getItem("token");

            // Check if both user ID and token are available
            if (!userId || !token) {
                // Log the error
                console.error("User ID or token is missing, user not logged in");
                // Throw an error to indicate the missing user ID or token
                throw new Error("User ID or token is missing, user not logged in");
            }

            // Check token expiration
            if (isTokenExpired(token)) {
                // Token has expired, handle logout
                logout();
                return;
            }

            const response = await fetch(`${baseUrl}/api/image/${props.imageId}/likes`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                },
                body: JSON.stringify({ 
                    imageId: props.imageId,
                    userId: userId 
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setReRender(responseData.message);
            } else {
                console.error('Failed to access userID array');
                console.log(props.imageId)
                console.log(userId)
            }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
            // Redirect to the login page
            const userDecision = window.confirm(
                'You need to be logged in to like the image. Do you want to go to the login page?'
            );

            if (userDecision) {
                // If the user clicks OK, navigate to the login page
                navigate('/login');
            } else {
                // If the user clicks Cancel, you can handle it here (e.g., do nothing or show a message)
                console.log('User decided to stay on the post page without liking the image.');
            }
        }
    };

    const isTokenExpired = (token) => {
        // Implement your logic to check if the token is expired
        // You can compare the current time with the expiration time in the token
        // Return true if expired, false otherwise
        // Example: (actual implementation might vary based on your token structure)
        const decodedToken = decodeToken(token);
        return decodedToken.exp * 1000 < Date.now();
    };

    const decodeToken = (token) => {
        // Implement your logic to decode the token
        // You can use a library like jsonwebtoken or implement your own decoding logic
        // Example: (actual implementation might vary based on your token structure)
        return JSON.parse(atob(token.split('.')[1]));
    };

    const logout = () => {
        // Implement your logic to clear user-related information
        removeExpiredToken();
        // Additional logout logic (e.g., show alert)
        alert('You have been logged out.');
        // If you want to provide the option to navigate to the login page, you can use a confirm dialog
        const userDecision = window.confirm('Do you want to go to the login page?');
        if (userDecision) {
          // If the user clicks OK, navigate to the login page
            navigate('/login');
        } else {
          // If the user clicks Cancel, you can handle it here (e.g., do nothing)
            console.log('User decided to stay on the current page.');
        }
    };
    

    const removeExpiredToken = () => {
        // Implement your logic to remove the expired token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
    };

    const handleSubmitLikes = async (e) => {
        e.preventDefault();
        checkIfUserHasLikedImage()
    };

    return (
        <>
            <div className='likescontainer'>
                <form onSubmit={handleSubmitLikes}>
                    <button
                        className='likeButton'
                        type='submit'
                        onClick={handleSubmitLikes}
                    >
                        <img src={likebutton} alt='Like' />
                    </button>
                </form>
    
                <LikeAmountDisplay className='likeamount' imageId={ props.imageId } rerender={ reRender } />
            </div>
        </>
    );
};

export default LikeButton;
