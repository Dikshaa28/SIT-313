// src/components/FeaturedArticles.js
import React from "react";
import "./FeaturedArticles.css";

function FeaturedArticles() {
  const articles = [
    {
      title: "Great Wall of China",
      desc: "A marvel of strength and defense, stretching across history.",
      img: "greatwall.jpg", 
    },
    {
      title: "Christ the Redeemer",
      desc: "The towering symbol of faith overlooking Rio de Janeiro.",
      img: "redeemer.jpg",
    },
    {
      title: "Machu Picchu",
      desc: "Lost city of the Incas, perched high in the Andes.",
      img: "machupicchu.jpg",
    },
  ];

  return (
    <section className="articles">
      <h2>Featured Articles</h2>
      <div className="article-list">
        {articles.map((a, i) => (
          <div key={i} className="article-card">
            <img src={a.img} alt={a.title} className="article-img" />
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </div>
        ))}
      </div>
      <a href="#all-articles" className="see-all">See all articles</a>
    </section>
  );
}

export default FeaturedArticles;
