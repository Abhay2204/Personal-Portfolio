const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for the root route
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB connection using Atlas
mongoose.connect('mongodb+srv://abhaymallick2002:8421822204@cluster1.lvgj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err));

// Define Schema and Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactNo: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, contactNo, message } = req.body;

    // Validation
    if (!message) {
        return res.status(400).send('Message cannot be empty');
    }

    if (!email && !contactNo) {
        return res.status(400).send('Either email or phone number must be provided');
    }

    const newContact = new Contact({ name, email, contactNo, message });
    newContact.save()
        .then(() => res.send('Data saved successfully'))
        .catch((err) => res.status(500).send('Error saving data: ' + err.message));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});