import { React, useState } from 'react'
import axios from 'axios';
import './insertform.css';


const ClubUser = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [clubname, setClubname] = useState('');
  const [file, setFile] = useState('');

  const SubmitButton = async () => {
    try {
      if (clubname && file) {
        const formData = new FormData();
        formData.append('file', file);
        const filename = await axios.post('http://localhost:5000/uploadfile', formData, { headers: { "Authorization": `Bearer ${user.token.toString()}` } });
        const newClub = {
          clubName: clubname,
          clubFile: filename.data,
          userEmail: user.email,
        }
        const res = await axios.post('http://localhost:5000/users/me/applyforclubuser', newClub, { headers: { "Authorization": `Bearer ${user.token.toString()}` } });
        console.log(res);
        if (res.status == 200) {
          alert('Applied Successfully');
          setClubname('');
          setFile('');
        }
      }
      else {
        alert('Please fill all the fields');
      }
    }
    catch (error) {
      console.log(error);
      alert('Error Occured');
    }
  }




  return (
    <>
      <div className='insertformbody'>
        <div>
          <div className='form'>
            <h1>Apply for club user</h1>
            <br /><br />
            <input className='insertformbodyinput' type="text" placeholder="Club Name" value={clubname} onChange={(e) => setClubname(e.target.value)} />
            <input className='insertformbodyinput' type="file" accept='pdf/*' onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <button type="submit" className='buttonloginpage' onClick={SubmitButton}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClubUser