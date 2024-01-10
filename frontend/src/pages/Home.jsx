import Feed from '../components/feed/Feed';
import './Home.css';

const Home = ({navigate}) => {

    return (
        <>
        <div>
            {/* <h1>Home Page:</h1>
            <h1>Bald Bible</h1> */}
            <h2 className='mainHeader' id="home-statement">Welcome to Bald Bible</h2>
            <p className='mainTagline' id="home-statement">A positive corner of the internet to help you accept your hair loss . . . Not fight it.</p>
            <Feed navigate={navigate}/>
        </div>
        </>
    )
};

export default Home