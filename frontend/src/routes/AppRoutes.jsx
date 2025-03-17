import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import Contact from '../pages/Contact';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Products />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
    </Router>
  );
};

export default AppRoutes
