import React, { useState } from "react";
import "./ArticleForm.css";

function ArticleForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Please fill out all required fields (Title & Content).");
      return;
    }

    const articleData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      imageFile,
    };

    onSubmit(articleData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (jpg, png, gif).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }

      setImageFile(file);
      setError("");

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setTags("");
    setImageFile(null);
    setImagePreview("");
    setError("");
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <h3>Write an Article</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Content *</label>
        <textarea
          placeholder="Write your article content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., tutorial, web-development, tips"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Upload Image (Optional)</label>
        <input
          id="article-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => {
                setImageFile(null);
                setImagePreview("");
                document.getElementById("article-image").value = "";
              }}
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Article"}
        </button>
        <button type="button" onClick={clearForm} disabled={loading}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;
