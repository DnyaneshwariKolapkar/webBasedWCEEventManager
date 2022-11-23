import { React, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Calender = () => {

    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const onChange = date => {
        setCalendar([]);
        const selecteddate = date;
        getEvents(selecteddate);
        setDate(date);
    }

    const getEvents = async (selecteddate) => {
        try {
            const res = await axios.get("http://localhost:5000/getEvents/" + (selecteddate.toString()));
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
        getEvents();
    }, []);

    const EventCard = ({ event }) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date1 = date.getDate().toString() + " " + month[date.getMonth()] + " " + date.getFullYear().toString();
        return (
            <>
                <div className="card" style={{justifyContent: 'middle'}} >
                    <div style={{ width: '100%',  display: 'flex', justifyContent: 'center' }}>
                    <img src={"http://localhost:5000/uploads/" + event.eventimage} alt="Avatar" style={{ width: '180px', borderRadius: "10px" }} />
                    </div>
                    
                    <div className="container1">
                        <h3><b>{event.eventname}</b></h3>
                        <p>On <b>{date1}</b> at <b>{event.starttime}</b> for <b>{event.duration} Hr</b></p>
                        <p><i>Organised By <b>{event.createdBy}</b></i> </p>
                    </div>
                </div>
            </>
        )
    }

    const [calendar, setCalendar] = useState(null);
    const navigate = useNavigate();
    return (
        <>
            <br /><br />
            <div style={{display: 'flex'}}  >
                <div className="bodycalendar" style={{  justifyContent: 'left' }}>
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
            <>

                <button className="addbutton" onClick={() => navigate("/insertform", {
                    state: {
                        params: date
                    }
                })}>Add Event</button>
                {/* <Link to={{
                pathname: "/insertform",
                state: {
                    params: "Ritesh"
                }
            }}>Add Event</Link> */}
            </>
        </>
    )
}

export default Calender