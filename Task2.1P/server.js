require('dotenv').config();
const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// load SendGrid API key + sender email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// serve html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// handle form
app.post('/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email." });
    }

    const msg = {
      to: email,
      from: FROM_EMAIL,
      subject: "Welcome to DEV@Deakin 🎉",
      text: `Hi ${name || "there"}! Thanks for joining DEV@Deakin. You're now part of our community.`,
      html: `
        <h2 style="font-family:sans-serif;color:#16a34a">Welcome to DEV@Deakin 🎉</h2>
        <p>Hi ${name || "friend"},</p>
        <p>Thanks for joining our community. Stay tuned for updates and opportunities!</p>
      `,
    };

    await sgMail.send(msg);
    res.json({ success: true, message: " Welcome email sent!" });
  } catch (err) {
    console.error("SendGrid error:", err.response?.body || err.message);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});


