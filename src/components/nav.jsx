
import React, { useState, useEffect } from "react";
import "../css/nav.css"; 
import { FaSun, FaMoon } from "react-icons/fa";
import {toggleTheme} from '../redux/dataSlice.js'
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()
  const {theme}  = useSelector(state => state.covidData)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${theme}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">📊 CovidTracker</div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/graphs">Graphs</a></li>
          <li><a href="/reports">Reports</a></li>
        </ul>

        <button className="theme-toggle" onClick={()=> dispatch(toggleTheme()) }>
          { theme=='light' ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
