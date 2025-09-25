// src/components/Header.js
import React from "react";
import "./Header.css";
import b2 from "./b2.png";

function Header() {
  return (
    <>
      <header className="header">
        <h1>WondersOfficial</h1>
        <nav>
          <a href="#login">Login</a>
          <a href="#signup">Sign Up</a>
        </nav>
      </header>
      <img src={b2} alt="A beautiful wonder" className="header-image" />
    </>
  );
}

export default Header;