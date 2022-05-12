import React from 'react';
import { Link } from 'react-router-dom'; 
import "./navbar.css";

function Navbar() {
  return (
  <div className='navbar'>
    <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
            <h3>Logo</h3>
            </Link>
            <ul className="nav-list">
            <Link to="/home" style={{textDecoration: 'none', color: 'white', marginRight: '20px', textAlign: 'center', fontWeight: 700, justifyContent: 'center'}}>
            <li>Home Page</li>
            </Link>
            <Link to="/person" style={{textDecoration: 'none', color: 'white', marginRight: '20px', textAlign: 'center', fontWeight: 700, justifyContent: 'center'}}>
            <li>Person</li>
            </Link>
            <Link to="/films" style={{textDecoration: 'none', color: 'white', marginRight: '20px', textAlign: 'center', fontWeight: 700, justifyContent: 'center'}}>
            <li>Films</li>
            </Link>
            <Link to="/film-ratings" style={{textDecoration: 'none', color: 'white', marginRight: '20px', textAlign: 'center', fontWeight: 700, justifyContent: 'center'}}>
            <li>Film Ratings</li>
            </Link>
            <Link to="/user-selection" style={{textDecoration: 'none', color: 'white', marginRight: '20px', textAlign: 'center', fontWeight: 700, justifyContent: 'center'}}>
            <li>User Selection</li>
            </Link>
            {/* <Link to="/user-selection" style={{textDecoration: 'none', color: 'white', marginRight: '20px', textAlign: 'center', fontWeight: 700, justifyContent: 'center'}}>
            <li>User Selection</li>
            </Link> */}
            </ul>
  </div>
  );
}

export default Navbar;

