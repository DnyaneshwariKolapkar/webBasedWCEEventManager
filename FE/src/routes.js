import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./component/Basics/Loginpage";
import Mainpage from "./component/Basics/Mainpage";
import Verificartionpage from "./component/Basics/verificartionpage";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/verificartionpage" element={<Verificartionpage />} />
    </Routes>
  )
}

export default Router