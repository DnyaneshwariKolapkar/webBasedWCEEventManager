import './mainpage.css';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Mainpage = () => {

  const navigate = useNavigate();

  return (
    <>
      <div style={{backgroundColor:'#faf7f2'}}>
        <nav className='navbar'>
          <div className='btn-group'>
            <button className='btn-group__item' onClick={() => {navigate("/mainpage")}}> All Events </button>
            <button className='btn-group__item'> Notifications </button>
            <button className='btn-group__item' onClick={() => navigate("calendar")}> Calendar </button>
            <button className='btn-group__item'> Profile </button>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  )
}

export default Mainpage;