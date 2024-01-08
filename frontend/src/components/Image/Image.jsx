
import { useSearchParams } from "react-router-dom";
import Comments from "../comment/comment";

const Image = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const imageSrc = searchParams.get("imageSrc")

    return <>
        <h1>Image</h1>
        {/* <Comments imageId={} */}
        <img src={imageSrc}></img>
    </>
} 
    
export default Image