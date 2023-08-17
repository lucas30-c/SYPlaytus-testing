const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { MONGO_URI, JWT_SECRET } = require('./config');
const User = require('./models/User');

const app = express();

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => {
   console.error('Error connecting to MongoDB:', err);
   process.exit(1);  // Exit the process with failure
});


app.use(cors());
app.use(express.json());

// Sign Up
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(200).send('User registered');
    } catch (error) {
        console.error('Signup Error:', error); // Enhanced logging
        res.status(500).send('Error registering user');
    }
});


// Log In
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Browse Users (protected)
app.get('/users', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');

    try {
        jwt.verify(token, JWT_SECRET);
        const users = await User.find({}, 'username');  // Return only the usernames
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
