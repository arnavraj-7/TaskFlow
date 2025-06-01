import { useEffect ,useState} from "react";
import LoadingScreen from "./LoadingScreen";
import App from "/src/App.jsx";
import Footer from "./Footer";

const AppWrapper = () => {
    const [loaded, setLoaded] = useState(false);
  function handleLoading(){
    setLoaded(true)
  }
    return(
        <>
       <App loaded={loaded} handleLoading={handleLoading}/><Footer/>
       {!loaded?<LoadingScreen />:""}
        </>
    ) 
};

export default AppWrapper;
