import { useState, useEffect } from 'react';
import baseUrl from '../../../util/baseUrl';

const LikeAmountDisplay = (props) => {
    const [likesAmount, setLikesAmount] = useState(0);

    const getLikesAmount = async () => {
        try {
            const token = window.localStorage.getItem("token");

            const response = await fetch(`${baseUrl}/api/image/${props.imageId}/likes`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setLikesAmount(responseData.likes);
            } else {
                console.error('Failed to get likes amount');
            }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
        }
    };

    useEffect(() => {
        // Call the getLikesAmount function when the component mounts or when props.image_id or props.rerender changes
        getLikesAmount();
    }, [props.imageId, props.rerender]);

    return (
        <div>
                <strong>
                {likesAmount} {likesAmount === 1 ? 'like' : 'likes'}
                </strong>
                <br></br>
        </div>
    );
};

export default LikeAmountDisplay;