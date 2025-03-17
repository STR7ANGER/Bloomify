import React from 'react';
import bloomifyWhite from '../assets/logos/bloomify-white.png';
import bloomifyBlack from '../assets/logos/bloomify-black.png';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='flex items-center justify-center h-screen '>
        <div className='bg-white shadow-lg drop-shadow-xl p-6 w-[40rem] text-center border border-gray-200 rounded-2xl'>
            <Link to="/" className='flex justify-center'>
                <img src={bloomifyBlack} className="w-[25rem] h-auto" alt="" />
            </Link>
            <div className='grid grid-cols-2 gap-2'>
                <input type="text" placeholder='First Name' className='p-2 rounded-md border border-gray-300 bg-gray-50 font-light placeholder-gray-800' />
                <input type="text" placeholder='Last Name' className='p-2 rounded-md border border-gray-300 bg-gray-50 font-light placeholder-gray-800' />
                <input type="email" placeholder='Email' className='p-2 rounded-md border border-gray-300 bg-gray-50 font-light col-span-2 placeholder-gray-800' />
                <input type="password" placeholder='Password' className='p-2 rounded-md border border-gray-300 bg-gray-50 font-light placeholder-gray-800' />
                <input type="password" placeholder='Confirm Password' className='p-2 rounded-md border border-gray-300 bg-gray-50 font-light placeholder-gray-800' />
                
                <select id="options" name="options" className='appearance-none p-2 rounded-md border border-gray-300 bg-gray-50 font-light col-span-2'>
                    <option value="option1">User</option>
                    <option value="option2">Seller</option>
                </select>
                
                <div className='col-span-2 flex justify-center'>
                    <button className='bg-[#F0394D] text-white p-2 mt-2 w-full rounded-full'>Sign Up</button>
                </div>
                <p className='text-center col-span-2 mt-5 font-light'>Already have an account? <Link to="/login" className='text-blue-700 tracking-[-0.03em]'>Log In</Link></p>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default SignUp
