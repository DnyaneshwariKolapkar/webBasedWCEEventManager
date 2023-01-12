import { React, useState, useEffect } from 'react'
import axios from 'axios'

const ClubUsers = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [clubusers, setClubusers] = useState([]);

  const getClubUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/current/clubusers',{headers: {"Authorization": `Bearer ${user.token.toString()}`}})
      setClubusers(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getClubUsers();
  }, [])

  const UserResponse = async (email) => {
    try {
      console.log(email);
      const res = await axios.post(`http://localhost:5000/demoteclubuser`, { email: email }, {headers: {"Authorization": `Bearer ${user.token.toString()}`}})
      getClubUsers();
      if (res.status === 200) {
        alert("User is demoted");
      }
      else if (res.data === "User is not a club user") {
        alert("User is not a club user");
      }
      else if (res.data === "User is not a club admin") {
        alert("User is not a club admin");
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", padding: "2.5rem 0 0 0 " }}>Club Users</h1>
        <br /><br />
        <table>
          <tbody>
            <tr>
              <th>Club Name</th>
              <th>Club File</th>
              <th>User Email</th>
              <th>Remove</th>
            </tr>
          </tbody>
          {clubusers.map((clubuser) => {
            return (
              <tbody key={clubuser.email}>
                <tr>
                  <td>{clubuser.clubName}</td>
                  <td><a href = {"http://localhost:5000/uploads/clubfiledata/" + clubuser?.clubFile}>Document</a></td>
                  <td>{clubuser.email}</td>
                  <td><button className='buttonloginpage' onClick={() => { UserResponse(clubuser.email) }}>Remove</button></td>
                </tr>
              </tbody>
            )
          }
          )}
        </table>
      </div>
    </>
  )
}

export default ClubUsers