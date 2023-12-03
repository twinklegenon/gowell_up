// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user'); // we will create this model next
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const waterRoutes = require('./routes/waterRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
// Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials
const mongoURI = 'mongodb+srv://qtsgenon:mernstack@cluster0.fdqfgve.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/signup', async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword
    });

    const result = await user.save();
    res.status(201).send({ message: 'User created', userId: result._id });
  } catch (error) {
    res.status(500).send("Error signing up. Please try again.");
  }
});

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() }); // Case-insensitive email comparison
      if (!user) {
        console.log('User not found with email:', email);
        return res.status(401).json({ message: 'Email or password is wrong' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password); // Ensure 'user.password' is the correct field
      if (!isMatch) {
        console.log('Password does not match for user:', email);
        return res.status(401).json({ message: 'Email or password is wrong' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' }); // Use an environment variable for the secret
      console.log('User logged in:', email);
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Error logging in. Please try again." });
    }
  });

app.use('/water', waterRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on port ${PORT}`);
  });
