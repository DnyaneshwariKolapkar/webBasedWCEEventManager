import { React, useState } from 'react'
import './insertform.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


function Insertform({ eventDate }) {
    const [eventName, setEventName] = useState('');
    const [about, setAbout] = useState('');
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventLink, setEventLink] = useState('');
    const navigate = useNavigate();
    const loc = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // const history = useHistory();
    const data = loc?.state?.params;

    const SubmitButton = async () => {
        try {
            if (eventName && about && duration && startTime && eventLocation && eventLink) {
                const newCalendar = {
                    eventname: eventName,
                    description: about,
                    duration: duration,
                    starttime: startTime,
                    location: eventLocation,
                    link: eventLink,
                    date: eventDate
                }
                const res = await axios.post('http://localhost:5000/insertevent', newCalendar, { headers: { "Authorization": `Bearer ${user.token.toString()}` } });
                if (res.status === 200) {
                    alert('Event Added Successfully');
                    setEventName('');
                    setAbout('');
                    setDuration('');    
                    setStartTime('');
                    setEventLocation('');
                    setEventLink('');
                    navigate('/daywiseevents');
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <>
            <div className='insertformbody'>
                <div>
                    <div className='form'>
                        <h1>Book Slot on {eventDate.getDate().toString() + " " + month[eventDate.getMonth()] + " " + eventDate.getFullYear().toString()} </h1>
                        <br /><br />
                        <input className='insertformbodyinput' type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Link" value={eventLink} onChange={(e) => setEventLink(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Description" value={about} onChange={(e) => setAbout(e.target.value)} />
                        <br />
                        <button type="submit" className='buttonloginpage' onClick={SubmitButton} >Submit</button>
                    </div>
                </div>
                <div> {data} + tada </div>
            </div>
        </>
    )
}

export default Insertform