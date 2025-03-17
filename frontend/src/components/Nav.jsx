import React from 'react'
import bloomifyBlack from '../assets/logos/bloomify-black.png'

const Nav = () => {
  return (
    <header>
      <div className='w-full py-8'>
      <div className='relative'>
        <div className='flex justify-between items-center py-4 px-8'>
          <div className='absolute w-200 h-50 flex items-center'>
            <img src={bloomifyBlack} alt="logo" className='h-full object-contain'/>
          </div>
          <div className='absolute flex space-x-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <a href='#' className='text-lg'>Home</a>
            <a href='#' className='text-lg'>About</a>
            <a href='#' className='text-lg'>Contact</a>
          </div>
          <div className='absolute right-8'>
            <a href="">Sign Up</a>
          </div>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Nav
