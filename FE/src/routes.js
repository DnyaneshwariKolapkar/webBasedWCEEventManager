import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./component/Basics/Loginpage";
import Mainpage from "./component/Basics/Mainpage";
import Verificartionpage from "./component/Basics/verificartionpage";
import Calendar from "./component/Basics/calendar.js";
import Eventpage from "./component/Basics/eventpage";
import { useState } from "react";
import DayWiseEvents from "./component/Basics/daywiseevents";
import Insertform from "./component/Basics/insertform";
import Profile from "./component/Basics/Profile";


const Router = () => {
  // const [ user, setUser ] = useState();
  const [date, setDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  // if(!user) {
  //   return (<Loginpage setUser={setUser} />)
  // }
  // console.log(date);

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/mainpage" element={<Mainpage />} >
        <Route path="" element={<Eventpage />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="verificartionpage" element={<Verificartionpage />} />
        <Route path="calendar" element={<Calendar params={setDate} />} />
      </Route>
      <Route path="daywiseevents" element={<DayWiseEvents eventDate={date} />} />
      <Route path="insertform" element={<Insertform eventDate={date} />} />
    </Routes>
  )
}

export default Router