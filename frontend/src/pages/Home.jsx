import Feed from '../components/feed/Feed';

const Home = ({navigate}) => {

    return (
        <>
        <div>
            {/* <h1>Home Page:</h1>
            <h1>Bald Bible</h1> */}
            <h2 id="home-statement">Social network for people who are bald or experiencing hair loss</h2>
            <Feed navigate={navigate}/>
        </div>
        </>
    )
};

export default Home