// src/components/FeaturedTutorials.js
import React from "react";
import "./FeaturedTutorials.css";

function FeaturedTutorials() {
  const tutorials = [
    {
      title: "How to Hike Ancient Trails",
      desc: "Discover the best tips for exploring wonders like Machu Picchu and Petra on foot.",
      img: "hiking.jpg", // replace with your image path
    },
    {
      title: "Capturing Wonders with Photography",
      desc: "Learn how to take stunning travel shots of landmarks and landscapes.",
      img: "photography.jpg",
    },
    {
      title: "Adventure Travel Essentials",
      desc: "Pack smart and be ready for your next big journey around the world.",
      img: "travelgear.jpg",
    },
  ];

  return (
    <section className="tutorials">
      <h2>Featured Tutorials</h2>
      <div className="tutorial-list">
        {tutorials.map((t, i) => (
          <div key={i} className="tutorial-card">
            <img src={t.img} alt={t.title} className="tutorial-img" />
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
      <a href="#all-tutorials" className="see-all">See all tutorials</a>
    </section>
  );
}

export default FeaturedTutorials;
