import React from "react";
import Header from "./Header";
import './App.css';
// import Bigimage from "./Bigimage";
import FeaturedArticles from "./FeaturedArticles";
import FeaturedTutorials from "./FeaturedTutorials";
import SignupBox from "./SignupBox";
import ColorBox from "./ColorBox";

function App() {
  return (
    <div>
      <Header />
      {/* <Bigimage /> */}
      <FeaturedArticles />
      <FeaturedTutorials />
      <SignupBox />
      <ColorBox />
    </div>
  );
}

export default App;
