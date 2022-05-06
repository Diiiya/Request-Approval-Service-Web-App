import './App.css';
import { useParams, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from '../Login/Login';
import CreatePolicy from '../CreatePolicy';
import CreateRequest from '../CreateRequest';
import ViewRequests from '../ViewRequests';
import UserRequests from '../UserRequests';

function App() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const isLoggedIn = localStorage.getItem("user");

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");    
  }

  // let adminActions;
  // if (isAdmin === true) {
  //   adminActions = <><div className='navigationLink' onClick={() => navigate("/create-policy")}>CREATE POLICY</div>
  //   <div className='navigationLink'>|</div></>;
  // } if (isAdmin === false) {
  //   adminActions = <div></div>;
  // }

  return (
    <div className='body'>
    {isLoggedIn ? 
      <div className='navigationBar'>
        {console.log("test, ", isAdmin)}    
        <div hidden={!isAdmin}>
          <div className='navigationLink' onClick={() => navigate("/create-policy")}>CREATE POLICY</div>
          <div className='navigationLink'>|</div>
        </div>
        {/* { isAdmin === true && 
          <>
          <div className='navigationLink' onClick={() => navigate("/create-policy")}>CREATE POLICY</div>
          <div className='navigationLink'>|</div>
          </>} */}
          {/* {adminActions} */}
        <div className='navigationLink' onClick={() => navigate("/create-request")}>CREATE REQUEST</div>
        <div className='navigationLink'>|</div>
        <div className='navigationLink' onClick={() => navigate("/view-requests")}>ALL REQUESTS</div>
        <div className='navigationLink'>|</div>
        <div className='navigationLink' onClick={() => navigate("/user-requests/" + isLoggedIn)}>USER AWAITING REQUESTS</div>
        {isLoggedIn ?
          <LogoutIcon 
            fontSize="large"
            sx={{ position:"absolute", marginLeft:"570px", cursor: "pointer" }}
            onClick={() => logout()} /> : null}
      </div> : <div className='loggedOutNavBar'>APPROVAL REQUESTS SERVICE</div>}
      

    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-policy" element={<CreatePolicy />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/view-requests" element={<ViewRequests />} />
        <Route path="/user-requests/:username" element={<UserRequests />} />
      </Routes>
    </div>
  );
}

export default App;
