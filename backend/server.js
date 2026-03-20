const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const data = `${new Date().toISOString()} | ${name} | ${email} | ${message}\n`;

    fs.appendFile('messages.txt', data, (err) => {
        if (err) return res.status(500).send('Error saving message.');
        res.status(200).send('Message saved successfully.');
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
