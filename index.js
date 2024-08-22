const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema for the form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// Handle POST request to save form data
app.post('/submit-form', async(req, res) => {
    const { cname, cemail, cmessage } = req.body;

    const newContact = new Contact({
        name: cname,
        email: cemail,
        message: cmessage
    });

    try {
        await newContact.save();
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        res.status(500).send('An error occurred while submitting the form.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});