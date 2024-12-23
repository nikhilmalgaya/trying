const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


// Enable JSON body parsing
app.use(express.json());




// Use environment variable for MongoDB connection
const MONGODB_URI = 'mongodb+srv://malgayanikhil321:nikhilmalgaya321@cluster1.yopgy.mongodb.net/login2';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

const userSchema = new mongoose.Schema({
    username: { type: String, required :true},
    password: { type: String ,required :true},
});

const User = mongoose.model('User', userSchema);

const couponCodes = ["MYNTRA10", "FASHION20", "STYLE30", "WINTER50", "SUMMER15"];

app.post('/api/login', async (req, res) => {
    const { u_name, pass } = req.body; // Extract data from JSON payload
    console.log(req.body); // Log received data for debugging

    try {
        // Use extracted data to create a new user document
        const user = new User({ username: u_name, password: pass });
        await user.save();

        // Generate a random coupon code
        const randomCoupon = couponCodes[Math.floor(Math.random() * couponCodes.length)];
        res.status(200).json({
            message: `Hi ${u_name}, your Myntra coupon code is: ${randomCoupon}`
        });
    } catch (error) {
        console.error('Error saving login:', error);
        res.status(500).json({ error: 'Failed to save login' });
    }
});



// Handle other routes
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
