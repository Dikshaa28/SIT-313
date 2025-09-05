import React, { useState } from "react";
import "./QuestionForm.css";

function QuestionForm() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(` Question posted!\n\nTitle: ${title}\nDetails: ${details}`);
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <h3>Ask a Question</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter your question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Details</label>
        <textarea
          placeholder="Provide more context..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows="5"
          required
        />
      </div>

      <button type="submit">Post Question</button>
    </form>
  );
}
export default QuestionForm;
