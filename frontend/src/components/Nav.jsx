import React from 'react';
import { Link } from 'react-router-dom';
import bloomifyBlack from '../assets/logos/bloomify-black.png';
import Button from './Button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { LinkScroll } from 'react-scroll';

const Nav = () => {

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <div className={clsx('fixed w-full py-8 bg-white transition-all duration-300 z-50',
        hasScrolled && 'bg-white/80 bg-opacity-90 backdrop-blur-md'
      )}>
      <div className='relative'>
        <div className='flex justify-between items-center py-4 px-8'>
          <Link to="/" className='absolute w-[300px] h-[300px] flex items-center'>
            <img src={bloomifyBlack} alt="logo" className='h-full object-contain'/>
          </Link>
          <div className='absolute flex space-x-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Link to="/products" className='text-xl'>Products</Link>
            <Link to="/about" className='text-xl'>About</Link>
            <Link to="/contact" className='text-xl'>Contact</Link>
          </div>
          <div className='absolute right-8'>
            <Button to="/signup">Sign Up</Button>
          </div>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Nav
