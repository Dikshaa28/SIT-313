// src/components/ColorBox.js
import React from "react";
import "./ColorBox.css";

function ColorBox() {
  return (
    <footer className="color-box">
      <div className="footer-columns">
        <div>
          <h3>Explore</h3>
          <p>Home</p>
          <p>Questions</p>
          <p>Articles</p>
          <p>Tutorials</p>
        </div>
        <div>
          <h3>Support</h3>
          <p>FAQs</p>
          <p>Help</p>
          <p>Contact Us</p>
        </div>
        <div>
          <h3>Stay connected</h3>
          <div className="social-icons">
    
          <p>wonder.twitter.com</p>
          <p>wonder.instagram.com</p>
          <p>wonder.youtube.com</p>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>DEV@Deakin 2025</p>
        <p>Privacy Policy | Terms | Code of Conduct</p>
      </div>
    </footer>
  );
}

export default ColorBox;
