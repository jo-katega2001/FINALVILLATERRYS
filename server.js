const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Middleware to parse POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for booking request
app.post('/send-email', (req, res) => {
    // Grabbing form data
    const userName = req.body['user-name'] || '';
    const userEmail = req.body['user-email'] || '';
    const dateIn = req.body['date-in'] || '';
    const dateOut = req.body['date-out'] || '';
    const guests = req.body['guest'] || '';
    const room = req.body['room'] || '';

    // Set up Nodemailer transport with new Gmail details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terrysvilla12@gmail.com',  // Your new Gmail address
            pass: 'iuvkxpibiqqkquii'  // Your new Gmail App Password
        }
    });

    const mailOptions = {
        from: userEmail,
        to: 'terrysvilla12@gmail.com', // Your new Gmail address
        subject: 'New Booking Request',
        text: `
        You have received a new booking request:

        Name: ${userName}
        Email: ${userEmail}
        Check-in Date: ${dateIn}
        Check-out Date: ${dateOut}
        Guests: ${guests}
        Room Type: ${room}
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            res.send('Oops! Something went wrong: ' + error.message);
        } else {
            res.send('Thank you for your booking request. We will contact you shortly.');
        }
    });
});

// Route for general contact from website visitors
app.post('/contact-submit', (req, res) => {
    // Grabbing form data
    const userName = req.body['user-name'] || '';
    const userEmail = req.body['user-email'] || '';
    const message = req.body['message'] || '';

    // Set up Nodemailer transport with new Gmail details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terrysvilla12@gmail.com',  // Your new Gmail address
            pass: 'iuvkxpibiqqkquii'  // Your new Gmail App Password
        }
    });

    const mailOptions = {
        from: userEmail,
        to: 'terrysvilla12@gmail.com', // Your new Gmail address
        subject: 'New Message from Website Visitor',
        text: `
        You have received a new message:

        Name: ${userName}
        Email: ${userEmail}
        Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            res.send('Oops! Something went wrong: ' + error.message);
        } else {
            res.send('Thank you for reaching out. We will contact you shortly.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
