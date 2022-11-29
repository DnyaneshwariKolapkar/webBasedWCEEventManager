import { React, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Calender = () => {
    const Navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const onChange = date => {
        setCalendar(null);
        getEvents(date);
        setDate(date);
    }

    const getEvents = async (date) => {
        try {
            const res = await axios.get("http://localhost:5000/getEvents/" + (date.toString()));
            if (res.status === 200 && res.data.length > 0) {
                console.log(res.data);
                setCalendar(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getEvents(date);
    }, []);

    const EventCard = ({ event }) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const eventDate = date.getDate().toString() + " " + month[date.getMonth()] + " " + date.getFullYear().toString();
        return (
            <>
                <div className="card" style={{ justifyContent: 'middle' }} >
                    <img src={"http://localhost:5000/uploads/" + event.eventimage} alt="Avatar" className='card-image' />
                    <div className="container1">
                        <div style={{ maxWidth: "100%", wordWrap: "break-word" }}>
                            <p className='card-name'>{event.eventname}</p>
                            <p > <b>About -</b> {event.description} </p>
                            <p><b>Date - </b> {eventDate} <br /><b>Time - </b>{event.starttime} for {event.duration} Hr</p>
                            <p><i>Organised By <b>{event.createdBy}</b></i> </p>
                        </div>

                    </div>
                    {checkuser(event, date)}
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

    const [calendar, setCalendar] = useState(null);
    return (
        <>
            <br /><br />
            <div style={{ display: 'flex' }}  >
                <div className="bodycalendar" style={{ justifyContent: 'left' }}>
                    <Calendar onChange={onChange} value={date} />
                </div>
                <div style={{ backgroundColor: '#faf7f2', justifyContent: 'right', margin: '20px 0 50px' }}>
                    {calendar ?
                        <div className='placeevenly'>
                            {
                                calendar && calendar.map((event) => {
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
                        }>Hurheyyy No Events On This Day!!</h1>}
                </div>

            </div>
            {(date < new Date().setHours(0, 0, 0, 0) || user.usertype == 'user') ?
                null
                : <button className="addEventbutton" onClick={() => Navigate("/insertform", {
                    state: {
                        params: date
                    }
                })}>Add Event</button>}
            {(user.usertype == 'adminuser') ?
                <button className="addEventsbutton" onClick={() => Navigate("/insertEvents", {
                })}>Add Events</button>
                : null}

        </>
    )
}

export default Calender