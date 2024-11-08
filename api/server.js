const mongoose = require('mongoose');

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

// Coupon codes
const couponCodes = ["MYNTRA10", "FASHION20", "STYLE30", "WINTER50", "SUMMER15"];

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { u_name: username, pass: password } = req.body;

        try {
            const user = new User({ username, password });
            await user.save();

            // Select a random coupon code
            const randomCoupon = couponCodes[Math.floor(Math.random() * couponCodes.length)];
            res.status(200).send(`Hi ${username}, your Myntra coupon code is: ${randomCoupon}`);
        } catch (error) {
            console.error('Error saving login:', error);
            res.status(500).send('Failed to save login');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
