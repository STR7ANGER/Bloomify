import React from 'react'
import bloomifyBlack from '../assets/logos/bloomify-black.png';
import Button from '../components/Button';

const Home = () => {
  return (
    <div>
      <p>Welcome</p>
      <Button />
      <img className='h-[220px] w-[220px]' src={bloomifyBlack} alt="logo" />
    </div>
  )
}

export default Home
