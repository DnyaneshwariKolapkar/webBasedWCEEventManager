import { React, useState } from 'react'
import "./style.css";
import { Images } from '../../constants/images.js';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <div className="bodyloginpage" style={{ height: '80vh' }}>
        <h2>Profile page</h2>
        <div className="container" id="container">
          <div className="form">
            <img src={Images.tempImage} alt="Loading..." style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
            <p className='profileinfobox'>{user.name} <br /> {user.email} <br /> Club Description</p>
            {user.usertype == 'user' ?
              <button className="buttonloginpage" onClick={() => navigate("/clubuser")}>Apply for club user</button>
              : null}
            <br />
            <button className='buttonloginpage' onClick={() => logout()}>Log out</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile