import React, { useState } from "react";

function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("💌 Please enter your email!");
      return;
    }

    try {
      await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      setMessage("🎉 Thank you! Your subscription is sent!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong. Try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px", padding: "20px", backgroundColor: "#caeaf1ff", borderRadius: "10px" }}>
      <h2 style={{ color: "#72b2faff" }}>Subscribe to our Newsletter 📬</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#7082e8ff", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Subscribe
        </button>
      </form>
      <p style={{ marginTop: "15px", color: "#5c54e7ff", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default Newsletter;
