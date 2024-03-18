import React from 'react'
import { Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const userDetail = JSON.parse(localStorage.getItem('userData'));
  function handleLogout(){
    localStorage.removeItem('userData');
    navigate('/')
  }
  return (
    <div className='flex justify-around'>
        <Link to={'/dashboard'}><h3 className='cursor-pointer'>Home</h3></Link>
        <Link to={'/elist'}><h3 className='cursor-pointer'>Employee List</h3></Link>
        <h3 className='cursor-pointer'>{userDetail ? userDetail.username : ''}</h3>
        <button className='cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar