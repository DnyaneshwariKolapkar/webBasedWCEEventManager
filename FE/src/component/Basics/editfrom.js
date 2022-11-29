import { React, useState } from 'react'
import './insertform.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function EditFrom() {
    const loc = useLocation()
    const data = loc?.state?.params;
    const [eventName, setEventName] = useState(data.eventname);
    const [about, setAbout] = useState(data.description);
    const [duration, setDuration] = useState(data.duration);
    const [startTime, setStartTime] = useState(data.starttime);
    const [eventLocation, setEventLocation] = useState(data.location);
    const [eventLink, setEventLink] = useState(data.link);
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [photo, setPhoto] = useState();
    const date = new Date(data.date);

    // const history = useHistory();
    

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
                    date: data,
                    eventimage: ""
                }
                if (photo) {
                    const formData = new FormData();
                    formData.append('image', photo);
                    const res = await axios.post('http://localhost:5000/uploadphoto', formData, { headers: { "Authorization": `Bearer ${user.token.toString()}` } });
                    console.log(res.data);
                    newCalendar.eventimage = res.data;
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
                    navigate('/mainpage');
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
                        {console.log(date)}
                        <h1>Book Slot on {date.getDate().toString() + " " + month[date.getMonth()] + " " + date.getFullYear().toString()} </h1>
                        <br />
                        <input className='insertformbodyinput' type="text" placeholder="Event Name"  value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        <input className='insertformbodyinput' type="time" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <input className='insertformbodyinput' type="time" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Link" value={eventLink} onChange={(e) => setEventLink(e.target.value)} />
                        <textarea className='insertformbodytextarea' placeholder="Description" value={about} rows="15" cols="65" onChange={(e) => setAbout(e.target.value)} />
                        <input className='insertformbodyinput' type="file" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} />
                        <br />
                        <button type="submit" className='buttonloginpage' onClick={SubmitButton} >Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditFrom