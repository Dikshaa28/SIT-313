import React from "react";
import { signInWithGoogle, createUserDoc } from "../../firebase";
import "./Login.css";

function Login() {
  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      await createUserDoc(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>DEV@Deakin</h1>
        <p>Welcome to the developer community</p>
        <button className="google-signin-btn" onClick={handleSignIn}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;