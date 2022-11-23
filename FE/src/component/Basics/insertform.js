import { React, useState } from 'react'
import './insertform.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


function Insertform() {
    const loc = useLocation()
    const data = loc?.state?.params;
    const [eventName, setEventName] = useState('');
    const [about, setAbout] = useState('');
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventLink, setEventLink] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [photo, setPhoto] = useState();

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
                        <h1>Book Slot on {data.getDate().toString() + " " + month[data.getMonth()] + " " + data.getFullYear().toString()} </h1>
                        <br /><br />
                        <input className='insertformbodyinput' type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Link" value={eventLink} onChange={(e) => setEventLink(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Description" value={about} onChange={(e) => setAbout(e.target.value)} />
                        <input className='insertformbodyinput' type="file" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} />
                        <br />
                        <button type="submit" className='buttonloginpage' onClick={SubmitButton} >Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Insertform