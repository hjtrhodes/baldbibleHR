import { useState, useEffect } from 'react';

const LikeAmountDisplay = (props) => {
    const [token, setToken] = useState(window.localStorage.getItem('token'));
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const response = await fetch(`api/auth/image/${props.image_id}/likes`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        window.localStorage.setItem("token", data.token);
                        setToken(window.localStorage.getItem("token"));
                        setLikes(data.likes);
                    } else {
                        console.error('Failed to fetch likes data');
                    }
                }
            } catch (error) {
                console.error('Error in fetching or parsing data:', error);
            }
        };

        fetchData();
    }, [token, props.image_id, props.likes]);

    return (
        <div className='likes_amount'>
            <small>
                <strong>
                        {likes} likes
                </strong>
            </small>
        </div>
    );
};

export default LikeAmountDisplay;