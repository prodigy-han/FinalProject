import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm.trim()); // Pass the search term to the parent
      setSearchTerm(""); // Clear the input field
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">GAMING INTELLECT</div>
      <div className="navbar-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="navbar-buttons">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/create" className="nav-button">Create New Post</Link>
      </div>
    </nav>
  );
};

export default NavBar;
