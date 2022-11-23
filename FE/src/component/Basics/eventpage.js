import { React, useEffect, useState } from 'react'
import axios from 'axios';
import './mainpage.css';
import { Images } from '../../constants/images';


const Eventpage = () => {

    const EventCard = ({ event }) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const eventDate = new Date(event.date);
        const date = eventDate.getDate().toString() + " " + month[eventDate.getMonth()] + " " + eventDate.getFullYear().toString();
        return (
            <>
                <div className="card" >
                    <img src={"http://localhost:5000/uploads/" + event.eventimage} alt="Avatar" style={{ width: "100%", borderRadius: "10px" }} />
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
            <div>
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
                    }>No Events!!</h1>}
            </div>
        </>
    )
}

export default Eventpage;