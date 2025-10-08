import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import ArticleForm from "./ArticleForm";
import "./NewPost.css";

function NewPost({ user, onSubmitQuestion, onSubmitArticle, loading }) {
  const [postType, setPostType] = useState("question");

  return (
    <div className="newpost-page">
      <div className="newpost-header">
        <h1>Create a New Post</h1>
        <p>Posting as: <strong>{user.displayName}</strong></p>
      </div>

      <div className="posttype-select">
        <label>Post Type</label>
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          disabled={loading}
        >
          <option value="question">Question</option>
          <option value="article">Article</option>
        </select>
      </div>

      <div className="post-form">
        {postType === "question" ? (
          <QuestionForm onSubmit={onSubmitQuestion} loading={loading} />
        ) : (
          <ArticleForm onSubmit={onSubmitArticle} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default NewPost;
