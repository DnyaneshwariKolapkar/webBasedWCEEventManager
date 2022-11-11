import { React, useState } from 'react'
import "./style.css";
import { Images } from '../../constants/images.js';


const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user);
  return (
    <>
    <div className="bodyloginpage" style={{height:'80vh'}}>
                <h2>Profile page</h2>
                <div className="container" id="container">
                    {/* <div className="form-container sign-in-container"> */}
                        <div className="form">
                        <img src={Images.tempImage} alt="WCE logo" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                            <h3 className='profileinfobox'>{user.name}</h3>
                            <h3 className='profileinfobox'>{user.email}</h3>
                            <h3 className='profileinfobox'>{ }</h3>
                            <h3 className='profileinfobox'>Club Description</h3>
                            <button className='buttonprofile'>Apply for club user</button><br />
                            <button className='buttonprofile'>Log out</button>
                        </div>
                    {/* </div>    */}
                    </div>
                </div>
            

    

    </>
    
  )
}

export default Profile