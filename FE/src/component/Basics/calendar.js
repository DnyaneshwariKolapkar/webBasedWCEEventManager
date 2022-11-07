import React, { useState } from "react";
import Calendar from 'react-calendar';
import './calendar.css';
import { useNavigate } from "react-router-dom";

const Calender = ( { params } ) => {

    const [date, setDate] = useState(new Date(new Date().setHours(0,0,0,0)));
    const onChange = date => {
        setDate(date);
        params(date);
    }
    const Navigate = useNavigate();
    return (
        <>
        <br /><br />
            <div className="bodycalendar">
                <Calendar onChange={onChange} value={date} />
            </div>
            <div>{ date.toString() }</div>
            <button className="addbutton" onClick={() => {Navigate("/daywiseevents")}} >Get Schedule</button>
        </>
    )
}

export default Calender