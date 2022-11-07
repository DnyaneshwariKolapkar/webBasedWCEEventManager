import React from 'react'
import "./style.css";


const Profile = () => {
  return (
    <>
    <div className="bodyloginpage" style={{height:'80vh'}}>
                <h2>Profile page</h2>
                <div className="container" id="container">
                    {/* <div className="form-container sign-in-container"> */}
                        <div className="form">
                        <img src="https://www.wce.ac.in/wp-content/uploads/2019/07/WCE-Logo-1.png" alt="WCE logo" />
                            <h3 className='profileinfobox'>Name</h3>
                            <h3 className='profileinfobox'>email</h3>
                            <h3 className='profileinfobox'>Club Name</h3>
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