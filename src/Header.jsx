import React from 'react';
import { Link } from 'react-router-dom';
import myLogo from './assets/logo.jpg'; // Replace 'myLogo.svg' with the path to your custom logo
import './Header.css'; // Import the CSS file

function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={myLogo} className="logo" alt="My Logo" />
      </div>
      <div className="buttons-container">
        <Link to="/" className="button">Home</Link>
        <Link to="/films" className="button">Films</Link>
        <Link to="/customers" className="button">Customers</Link> {/* Add Customers button */}
      </div>
    </div>
  );
}

export default Header;
