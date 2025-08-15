require('dotenv').config();
const express = require('express');
const mailgun = require('mailgun-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Mailgun setup
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

// Middleware for serving static files and parsing form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // handles form submissions
app.use(express.json()); // handles JSON data

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle subscription form
app.post('/subscribe', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const emailData = {
        from: `DEV@Deakin Team <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: 'Welcome to DEV@Deakin Platform!',
        text: `Hello ${name || 'Developer'},\n\nWelcome to DEV@Deakin! We're excited to have you join our community.\n\nBest regards,\nThe DEV@Deakin Team`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">Welcome to DEV@Deakin!</h1>
                </div>
                <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                    <h2 style="color: #333; margin-top: 0;">Hello ${name || 'Developer'}!</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        We're thrilled to welcome you to the DEV@Deakin community! 🎉
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        You've just joined a vibrant community of developers, innovators, and tech enthusiasts. 
                        Here's what you can expect:
                    </p>
                    <ul style="color: #666; font-size: 16px; line-height: 1.6;">
                        <li>Access to cutting-edge development resources</li>
                        <li>Connect with fellow developers</li>
                        <li>Stay updated with the latest tech trends</li>
                        <li>Participate in exciting coding challenges</li>
                    </ul>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            Get Started
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
                        Thanks for joining us!<br>
                        <strong>The DEV@Deakin Team</strong>
                    </p>
                </div>
            </div>
        `
    };

    try {
        const result = await mg.messages().send(emailData);
        console.log(`Welcome email sent to: ${email}`, result);
        res.json({ success: true, message: 'Welcome email sent successfully!', email });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send welcome email', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on: http://localhost:${PORT}`);
});
