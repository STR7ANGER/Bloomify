import React from 'react'
import bloomifyBlack from '../assets/logos/bloomify-black.png';
import Button from '../components/Button';

const Home = () => {
  return (
    <div>
      <p className='text-8xl font-bold text-red-500 text-center uppercase'>Test</p>
      <img className='h-[220px] w-[220px]' src={bloomifyBlack} alt="logo" />
    </div>
  )
}

export default Home
