import { React, useEffect, useState } from 'react'
import axios from 'axios';
import './mainpage.css';
import { useNavigate } from 'react-router-dom';


const Eventpage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const Navigate = useNavigate();

    const EventCard = ({ event }) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const eventDate = new Date(event.date);
        const date = eventDate.getDate().toString() + " " + month[eventDate.getMonth()] + " " + eventDate.getFullYear().toString();
        return (
            <>
                <div className="card" style={{ justifyContent: 'middle', width: '100%' }} >
                    <img src={"http://localhost:5000/uploads/" + event.eventimage} alt="Avatar" className='card-image' />
                    <div className="container1">
                        <p className='card-name'>{event.eventname}</p>
                        <p> <b>About -</b> {event.description} </p>
                        <p><b>Date - </b> {date} <br /><b>Time - </b>{event.starttime} for {event.duration} Hr</p>
                        <p><i>Organised By <b>{event.createdBy}</b></i> </p>
                    </div>
                    {checkuser(event, eventDate)}
                </div>
            </>
        )
    }
    const checkuser = (event, eventDate) => {
        if (user.usertype === "adminuser" || (event.createdBy === user.name && eventDate >= new Date(new Date().setHours(0, 0, 0, 0)))) {
            return (
                <i className="fa fa-edit" style={{ fontSize: '34px', position: 'relative', top: '8px', right: '8px' }} onClick={() => Navigate("/editform", {
                    state: {
                        params: event
                    }
                })} />
            )
        }
    }

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/getEvents");
                if (res.status === 200 && res.data.length > 0) {
                    setCalendar(res.data);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        getEvents();
    }, []);

    const [calendar, setCalendar] = useState(null);

    return (
        <>
            <div className='card-body'>
                {calendar ?
                    <div className='placeevenly'>
                        {
                            calendar.map((event) => {
                                return (
                                    < EventCard event={event} key={event._id} />
                                )
                            }, [])
                        }
                    </div>
                    :
                    <h1 style={
                        {
                            textAlign: 'center',
                            color: '#585555',
                            backgroundColor: '#f5f5f5',
                            padding: '20px',
                            borderRadius: '10px',
                            marginTop: '20%',

                        }
                    }>No Events!!</h1>}
            </div>
        </>
    )
}

export default Eventpage;