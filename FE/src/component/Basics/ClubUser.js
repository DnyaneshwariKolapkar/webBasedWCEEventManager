import React from 'react'
import './insertform.css';


const ClubUser = () => {
  return (
    <>  
        <div className='insertformbody'>
                <div>
                    <div className='form'>
                        <h1>Apply for club user</h1>
                        <br /><br />
                        <input className='insertformbodyinput' type="text" placeholder="Name"  />
                        <input className='insertformbodyinput' type="text" placeholder="club name" />
                        <input className='insertformbodyinput' type="text" placeholder="post" />
                        <br />
                        <button type="submit" className='buttonloginpage'>Submit</button>
                    </div>
                </div>
                
            </div>
    </>
  )
}

export default ClubUser