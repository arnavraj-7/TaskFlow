import { useEffect ,useState} from "react";
import LoadingScreen from "./LoadingScreen";
import App from "/src/App.jsx";
import Footer from "./Footer";

const AppWrapper = () => {
    const [loaded, setLoaded] = useState(false);
    function handleLoadingFinish() {
    setLoaded(true);
  }
    return(
        <>
       <App loaded={loaded}/><Footer/>
       {!loaded?<LoadingScreen onLoadingComplete={handleLoadingFinish} />:""}
        </>
    ) 
};

export default AppWrapper;
