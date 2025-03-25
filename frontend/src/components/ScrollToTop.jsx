import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (window.scrollY > 50) { // Avoid unnecessary scrolling
          window.scrollTo({ top: 1, left: 0, behavior: "smooth" });
        }
      }, [pathname]); // Runs every time the pathname changes
  
    return null;
}

export default ScrollToTop
