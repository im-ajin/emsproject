import React from 'react'
import Navbar from '../components/Navbar'

const DashBoard = () => {
  return (
    <>
    <div className='mb-3'>EMS</div>
    <Navbar />
    <h1 className='bg-yellow-300 mt-3'>DashBoard</h1>
    <div className='min-h-[80vh] flex justify-center items-center'>
        <p>Welcome Admin Panel</p>
    </div>
    </>
  )
}

export default DashBoard