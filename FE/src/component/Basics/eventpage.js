import { React, useEffect, useState } from 'react'
import axios from 'axios';
import './mainpage.css';


const Eventpage = () => {

    const EventCard = ({ event }) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const eventDate = new Date(event.date);
        const date = eventDate.getDate().toString() + " " + month[eventDate.getMonth()] + " " + eventDate.getFullYear().toString();
        return (
            <>
                <div className="card" >
                    <img src={"./images/temp.jpg"} alt="Avatar" style={{ width: "100%", borderRadius: "10px" }} />
                    <div className="container1">
                        <h3><b>{event.eventname}</b></h3>
                        <p>On <b>{date}</b> at <b>{event.starttime}</b> for <b>{event.duration} Hr</b></p>
                        <p><i>Organised By <b>{event.createdBy}</b></i> </p>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/getEvents");
                setCalendar(res.data);
                console.log(res.data);
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
            <div style={{ backgroundColor: '#faf7f2' }}>
                <div className='placeevenly'>
                    {
                        calendar && calendar.map((event) => {
                            return (
                                < EventCard event={event} key={event._id} />
                            )
                        }, [])
                    }
                </div>
            </div>
        </>
    )
}

export default Eventpage;