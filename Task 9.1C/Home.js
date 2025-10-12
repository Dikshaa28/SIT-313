import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import Users from "./Users"; 
import "./Home.css";

function Home({ user, switchToLogin }) {
  const auth = getAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => switchToLogin())
      .catch((err) => console.error(err));
  };

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <div className="top-bar">
        <h2 className="logo">MyApp</h2>
        <nav className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#users">Users</a>
          <a href="#reports">Reports</a>
          <a href="#settings">Settings</a>
          <a href="#help">Help</a>
        </nav>
        <div className="top-right">
          <div 
            className="account" 
            onClick={() => setAccountOpen(!accountOpen)}
          >
            Account ▼
            {accountOpen && (
              <div className="dropdown">
                <p><strong>Name:</strong> {user.displayName || "user.displayname"}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            )}
          </div>
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-box">
        <h1>Welcome, {user.displayName || "User"}!</h1>
        <p>Glad to see you here </p>
      </div>

      {/* Users Cards Section */}
      <h3 style={{ marginLeft: "20px" }}>Explore Users</h3>
      <Users count={12} />
    </div>
  );
}

export default Home;
