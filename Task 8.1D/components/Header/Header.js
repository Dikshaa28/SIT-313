import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Header.css";

function Header({ user }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">DEV@Deakin</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Find Questions</Link>
          <Link to="/new-post" className="nav-link">New Post</Link>
        </nav>
        <div className="user-section">
          <span className="user-name">{user?.displayName || "User"}</span>
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
