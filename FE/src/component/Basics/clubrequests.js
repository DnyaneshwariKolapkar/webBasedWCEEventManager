import { React, useState, useEffect } from 'react'
const axios = require('axios');

const ClubRequests = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [clubrequests, setClubrequests] = useState([]);
    const getClubRequests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/clubuserRequests', { "Authorization": `Bearer ${user.token.toString()}` });
            console.log(res);
            setClubrequests(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getClubRequests();
    }, [])

    const UserResponse = async (response, email) => {
        try {
            const res = await axios.post(`http://localhost:5000/user/me/promotetoclubuser/${response}`, { email: email }, { headers: { "Authorization": `Bearer ${user.token.toString()}` } });
            getClubRequests();
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div>
                <h1 style={{ textAlign: "center", padding: "2.5rem 0 0 0 " }}>Club Requests</h1>
                <br /><br />
                <table>
                    <tbody>
                        <tr>
                            <th>Club Name</th>
                            <th>Club File</th>
                            <th>User Email</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </tbody>
                    {clubrequests.map((clubrequest) => {
                        return (
                            <tbody key={clubrequest.userEmail}>
                                <tr>
                                    <td>{clubrequest.clubName}</td>
                                    <td><a href = {"http://localhost:5000/uploads/clubfiledata/" + clubrequest.clubFile}>Document</a></td>
                                    <td>{clubrequest.userEmail}</td>
                                    <td><button className='buttonloginpage' onClick={() => { UserResponse('accept', clubrequest.userEmail) }}>Accept</button></td>
                                    <td><button className='buttonloginpage' onClick={() => { UserResponse('reject', clubrequest.userEmail) }}>Reject</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default ClubRequests