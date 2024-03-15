import { useState, useEffect } from "react";
import Feed from "../components/feed/Feed";
import "./Home.css";

const Home = ({ navigate }) => {
  const [showLongMessage, setShowLongMessage] = useState(false);

  const handleToggleMessage = () => {
    setShowLongMessage(!showLongMessage);
  };

  // Sets page title
  useEffect(() => {
    document.title = "Bald Bible";
  }, []);

  return (
    <div>
      <div>
        <h2 className="mainHeader" id="home-statement">
          Welcome to Bald Bible
        </h2>
        <p className="mainTagline" id="home-statement">
          A positive corner of the internet to help you embrace your hair loss
          and thrive.
        </p>
        <p className="testuser" id="home-statement">
          If you would like to see the content without signing up, you can use
          the following test user: <strong>test@test.com, Password123!</strong>
        </p>
        {!showLongMessage && (
          <>
            <p className="rendermessage"></p>
            <button className="showmessagebutton" onClick={handleToggleMessage}>
              Can't see any pictures? - Click Here
            </button>
          </>
        )}
        {showLongMessage && (
          <div className="rendercontainer">
            <>
              <p className="rendermessage">
                This website is deployed as a free web service on Render.com
              </p>
              <p className="rendermessage">
                These web services spin down with inactivity, so if you are not
                seeing any pictures and can't login or signup, you may have to
                wait a few minutes for the backend server to wake up. Sorry
                about that, but why not take a well-earned break, go grab a cup
                of tea and come back?
              </p>
              <p className="rendermessage">
                If you can see pictures but clicked the button anyway - ignore
                this message - the server is running, you're good to go!
              </p>
              <button className="messagebutton" onClick={handleToggleMessage}>
                Hide Message
              </button>
            </>
          </div>
        )}
      </div>
      <Feed navigate={navigate} />
    </div>
  );
};

export default Home;
