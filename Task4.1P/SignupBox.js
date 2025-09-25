// src/components/SignupBox.js
import React from "react";
import "./SignupBox.css";

function SignupBox() {
  return (
    <div className="signup-box">
      <h2>Sign up for your daily insider</h2>
      <input type="email" placeholder="Enter your email" />
      <button>Subscribe</button>
    </div>
  );
}

export default SignupBox;
