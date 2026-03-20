const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(cors());
app.use(express.json());

// Set SendGrid API key (replace with your client's key)
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

// Test route
app.get("/", (req, res) => res.send("Backend running on Render"));

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: "client@ttthema.co.za",  // Client's inbox
    from: "no-reply@ttthema.co.za", // Must be verified in SendGrid
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await sgMail.send(msg);
    res.send("Message sent successfully via SendGrid!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email via SendGrid.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
