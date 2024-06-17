import './home.css';
import { isAuthenticated } from "../user/services/authenticate";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Loader from "../user/assets/loader";
import Todo from './Todo';


const Home = ()=>{

    useEffect(() => {
        document.title = "Home Page";  
      }, []);

    const navigate = useNavigate();
    const [pageLoader , setPageLoader] = useState(true);
  useEffect(() => {
    setPageLoader(true);
    isAuthenticated().then((Auth) => {
      if (!Auth) {
        setPageLoader(false);
        navigate('/login'); // Redirect to '/login'
      }
      setPageLoader(false);
    });
  }, [navigate]);
  if (pageLoader){
    return(
        <div>
                <div className='loading'>
                    <Loader />
                </div>
        </div>
    )
  }

  return(
    <Todo />
  )

}

export default Home;