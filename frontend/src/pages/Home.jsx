import React, { useState, useEffect } from 'react';
import Feed from '../components/feed/Feed';
import './Home.css';

const Home = ({ navigate }) => {
    const [showMessage, setShowMessage] = useState(true);
    const [timer, setTimer] = useState(() => {
        // Try to get timer value from local storage, or set default to 300 seconds
        return parseInt(localStorage.getItem('timer')) || 300;
    });

    useEffect(() => {
        let interval;

        if (showMessage && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    // Save timer value to local storage
                    localStorage.setItem('timer', prevTimer - 1);
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [showMessage, timer]);

    useEffect(() => {
        if (timer === 0) {
            setShowMessage(false);
        }
    }, [timer]);

    return (
        <>
        <div>
            <div>
            <h2 className="mainHeader" id="home-statement">
                Welcome to Bald Bible
        </h2>
            <p className="mainTagline" id="home-statement">
                A positive corner of the internet to help you embrace your hair loss and thrive.
            </p>
            {showMessage && (
            <div className='rendercontainer'>
                <>
                <p className='rendermessage'>
                    This website is deployed as a free web service on Render.com - These web
                    services spin down with inactivity, particularly the backend server, so if you are not seeing any pictures and
                    can't login or signup, you may have to wait up to five minutes for it to wake up! Why not go grab a cup of
                    tea and come back? I promise it is worth it. But if you can see pictures - the server is running, you're good to go!
                </p>
                <p className='rendertimer'>
                    Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </p>
                </>
            </div>
            )}
            </div>
            <Feed navigate={navigate} />
        </div>
        </>
    );
};


export default Home;
