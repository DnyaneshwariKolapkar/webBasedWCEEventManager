import { React, useState } from 'react'
import "./style.css";
import { Images } from '../../constants/images.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  
  return (
    <>
      <div className="bodyloginpage" style={{ height: '80vh' }}>
        <h2>Profile page</h2>
        <div className="container" id="container">
          <div className="form">
            <img src={Images.tempImage} alt="Loading..." style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
            <h3 className='profileinfobox'>{user.name}</h3>
            <h3 className='profileinfobox'>{user.email}</h3>
            <h3 className='profileinfobox'>{ }</h3>
            <h3 className='profileinfobox'>Club Description</h3>
            <button className='buttonprofile' onClick={ () => navigate("/ClubUser")}>Apply for club user</button><br />
            <button className='buttonprofile'>Log out</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile