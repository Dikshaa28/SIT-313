import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { auth } from "./util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // automatically set user if logged in
    });
    return () => unsubscribe();
  }, []);

  if (user) {
    return <Home user={user} switchToLogin={() => setIsLogin(true)} />;
  }

  return (
    <div>
      {isLogin ? (
        <Login switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;
