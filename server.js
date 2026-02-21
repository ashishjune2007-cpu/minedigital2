const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // CSS + JS serve

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "DIGI.html"));
});

// Email route
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Form Data:", req.body);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ashishjune2007@gmail.com", // tumhara Gmail
                pass: "xrzdlnkpcryuvhln"        // App password
            }
        });

        const mailOptions = {
            from: "ashishjune2007@gmail.com",
            to: "ashishjune2007@gmail.com",
            subject: "New Contact Form Message",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent:", info.response);
        res.json({ success: true });
    } catch (error) {
        console.log("❌ Email Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
