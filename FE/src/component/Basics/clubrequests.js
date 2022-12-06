import { React, useState, useEffect } from 'react'
const axios = require('axios');

const ClubRequests = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [clubrequests, setClubrequests] = useState([]);

    useEffect(() => {
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
        getClubRequests();
    }, [])

    return (
        <>
            <div>
                <h1>Club Requests</h1>
                <br /><br />
                <table>
                    <tr>
                        <th>Club Name</th>
                        <th>Club File</th>
                        <th>User Email</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                    {clubrequests.map((clubrequest) => {
                        return (
                            <tr>
                                <td>{clubrequest.clubName}</td>
                                <td>{clubrequest.clubFile}</td>
                                <td>{clubrequest.userEmail}</td>
                                <td><button>Accept</button></td>
                                <td><button>Reject</button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default ClubRequests