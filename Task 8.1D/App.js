import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import Header from "./components/Header/Header";
import NewPost from "./components/NewPost/NewPost";
import FindQuestion from "./components/FindQuestion/FindQuestion";
import Login from "./components/Login/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<FindQuestion />} />
          <Route path="/new-post" element={<NewPost user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;