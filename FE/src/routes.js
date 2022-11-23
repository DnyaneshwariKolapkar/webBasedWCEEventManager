import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./component/Basics/Loginpage";
import Mainpage from "./component/Basics/Mainpage";
import Verificartionpage from "./component/Basics/verificartionpage";
import Calendar from "./component/Basics/calendar.js";
import Eventpage from "./component/Basics/eventpage";
import { useState } from "react";
import Insertform from "./component/Basics/insertform";
import Profile from "./component/Basics/Profile";
import ClubUser from "./component/Basics/ClubUser";


const Router = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/mainpage" element={<Mainpage />} >
        <Route path="" element={<Eventpage />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="verificartionpage" element={<Verificartionpage />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
      <Route path="/clubUser" element={<ClubUser />} />
      <Route path="/insertform" element={<Insertform />} />
    </Routes>
    </>
  )
}

export default Router