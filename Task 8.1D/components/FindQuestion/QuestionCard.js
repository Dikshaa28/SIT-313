import React from "react";
import "./QuestionCard.css";

function QuestionCard({ post, isExpanded, onExpand, onDelete }) {
  const formatDate = (date) => {
    if (!date) return "Unknown date";
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className={`card ${isExpanded ? "expanded" : ""}`}>
      <div className="card-header" onClick={onExpand}>
        <h3>{post.title}</h3>
        <button className="delete" onClick={(e) => { e.stopPropagation(); onDelete(); }}>×</button>
      </div>
      <p className="meta">By {post.author || "Anonymous"} on {formatDate(post.createdAt)}</p>
      {isExpanded && (
        <div className="card-body">
          <p>{post.content}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="card-image" />
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
