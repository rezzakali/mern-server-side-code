import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './styles/navbar.css';

function Navbar({ auth }) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <h3 className="navbar-brand">mStack</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {auth ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <HashLink className="nav-link" to="#home">
                  Home
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" to="#about">
                  About
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" to="#contact">
                  Contact
                </HashLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
