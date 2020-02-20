import React from 'react';
import './navbar.css';
import Logo from '../img/logo.png';

const Navbar=() => {
    return (
        <div className = "nav-wrapper">
            <img src = {Logo} className = "nav-logo" alt = 'Logo'/> 
            <input type="text" className = "nav-search" placeholder = "YouHa" />
        </div>
    );
};

export default Navbar;