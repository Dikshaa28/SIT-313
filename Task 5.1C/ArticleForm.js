import React, { useState } from "react";
import "./ArticleForm.css";

function ArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Article posted!\n\nTitle: ${title}\nContent: ${content}\nImage: ${image}`
    );
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <h3>Write an Article</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Write your article content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />
      </div>

      <div className="form-group">
        <label>Attachment URL (optional)</label>
        <input
          type="text"
          placeholder="Add Media link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button type="submit">Post Article</button>
    </form>
  );
}
export default ArticleForm;
