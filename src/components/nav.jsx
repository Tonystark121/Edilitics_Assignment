
import React, { useState, useEffect } from "react";
import "../css/nav.css"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">📊 CovidTracker</div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/graphs">Graphs</a></li>
          <li><a href="/reports">Reports</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
