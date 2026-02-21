app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false });
  }
});
