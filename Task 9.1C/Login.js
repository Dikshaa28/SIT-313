import React, { useState } from "react";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import { auth, signInWithGoogle, createUserDoc } from "./util/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful ");
      setError("");
    } catch {
      setError("Invalid email or password ");
      setSuccess("");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      await createUserDoc(user);
      setSuccess(`Logged in as ${user.displayName} `);
      setError("");
    } catch {
      setError("Google sign-in failed ");
      setSuccess("");
    }
  };

  return (
    <div className="form-box">
      <h1 className="app-heading">DEV@Deakin</h1>
      <h2 className="form-heading">Welcome Back</h2>

      <Form onSubmit={handleLogin}>
        <Form.Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button color="violet" fluid type="submit">Login</Button>
      </Form>

      <Divider horizontal>Or</Divider>

      <Button color="google plus" fluid onClick={handleGoogleLogin}>
        Sign in with Google
      </Button>

      {error && <Message negative>{error}</Message>}
      {success && <Message positive>{success}</Message>}

      <p className="switch-text">
        Don’t have an account?{" "}
        <span className="link" onClick={switchToSignup}>Sign Up</span>
      </p>
    </div>
  );
}

export default Login;
