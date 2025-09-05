import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import ArticleForm from "./ArticleForm";
import "./NewPost.css";

function NewPost() {
  const [postType, setPostType] = useState("question");

  return (
    <div className="new-post-page">


      <div className="newpost-header">
        <p className="subtitle">Got something on your mind?</p>
        <h1 className="title">Create a New Post</h1>
      </div>

      {/* Select Post Type Section */}
      <div className="posttype-box">
        <label htmlFor="postType">Select Post Type</label>
        <select
          id="postType"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
        >
          <option value="question">Question</option>
          <option value="article">Article</option>
        </select>
      </div>

      {/* Conditional Rendering for Form */}
      <div className="form-section">
        {postType === "question" ? <QuestionForm /> : <ArticleForm />}
      </div>

    </div>
  );
}
export default NewPost;
