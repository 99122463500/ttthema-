const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running on Render");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Message:", name, email, message);

  res.send("Message sent successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
