import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/about');
  }

  return (
    <button className='border border-red-500' onClick={handleClick}>About</button>
  )
}

export default Button
