import React, { useEffect } from 'react'
import axios from 'axios';
import './mainpage.css';

const Mainpage = () => {

  const EventCard = ({ event }) => {
    return (
      <>
        <div className="card" >
          <img src={"./images/temp.jpg"} alt="Avatar" style={{ width: "100%", borderRadius: "10px" }} />
          <div className="container1">
            <h3><b>{event.eventname}</b></h3>
            <p>On <b>{event.date}</b> at <b>{event.starttime}</b> for <b>{event.duration} Hr</b></p>
            {/* <p>
              {
                (event.branches).map((branch) => {
                  return (
                    <p key={branch._id} style={{display:"inline-grid"}}>{branch.branch}</p>
                  )
                })
              }
            </p> */}
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

  const [calendar, setCalendar] = React.useState(null);

  return (
    <>
      <div style={{backgroundColor:'#faf7f2'}}>
        <nav className='navbar'>
          <div className='btn-group'>
            <button className='btn-group__item'> All Events </button>
            <button className='btn-group__item'> Notifications </button>
            <button className='btn-group__item'> Calendar </button>
            <button className='btn-group__item'> Profile </button>
          </div>
        </nav>
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

export default Mainpage;