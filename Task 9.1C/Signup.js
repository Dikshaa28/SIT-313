import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { auth, createUserDoc } from "./util/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./Signup.css";

function Signup({ switchToLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match ");
      setSuccess("");
      return;
    }

    try {
      //  Create user with email/password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Update Firebase Auth profile with displayName
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      //  Create Firestore document
      await createUserDoc(user);

      setSuccess("Account created! Please login now.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error creating account ");
      setSuccess("");
    }
  };

  return (
    <div className="form-box">
      <h1 className="app-heading">DEV@Deakin</h1>
      <h2 className="form-heading">Create Your Account</h2>

      <Form onSubmit={handleSignup}>
        <Form.Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <Form.Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <Form.Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Form.Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Form.Input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <Button color="violet" fluid type="submit">Register</Button>
      </Form>

      {error && <Message negative>{error}</Message>}
      {success && <Message positive>{success}</Message>}

      <p className="switch-text">
        Already have an account? <span className="link" onClick={switchToLogin}>Login</span>
      </p>
    </div>
  );
}

export default Signup;
