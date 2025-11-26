import React from 'react'
import logo from '../assets/images/logo.png'
import homeBg from '../assets/images/home-bg.png' 
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen pt-8 flex justify-between flex-col w-full bg-red-400 bg-cover bg-bottom' style={{ backgroundImage: `url(${homeBg})` }}>
      <img className='w-16 ml-8' src={logo} alt="GoSafe Logo" />
      <div className='bg-white py-4 px-4 pb-7'>
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to='/UserLogin' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Start