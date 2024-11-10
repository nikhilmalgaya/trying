const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Enable JSON body parsing
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    couponCode: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Array of coupon codes with discount values
const couponCodes = [
    { code: "MYNTRA50", discount: "50% off on beauty products" },
    { code: "BEAUTY40", discount: "40% off on makeup items" },
    { code: "STYLE30", discount: "30% off on skincare" },
    { code: "FASHION25", discount: "25% off on haircare" },
    { code: "GLAMOUR20", discount: "20% off on fragrances" }
];

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { u_name: username, pass: password } = req.body;
    
    try {
        // Generate random coupon
        const randomCoupon = couponCodes[Math.floor(Math.random() * couponCodes.length)];
        
        // Save user with coupon
        const user = new User({
            username,
            password,
            couponCode: randomCoupon.code
        });
        await user.save();
        
        // Send success response
        res.status(200).json({
            success: true,
            username: username,
            couponCode: randomCoupon.code,
            discount: randomCoupon.discount,
            message: `Congratulations! You've received a special offer!`
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
});

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
