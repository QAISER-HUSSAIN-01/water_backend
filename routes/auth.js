import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, phone, address, balance, bottles } = req.body;
    const hashedPassword = password ?  await bcrypt.hash(password, 10): '';

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Registered Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration Failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Authentication Failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication Failed' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({ message:'Login Successfully', token: token, username: user.username });

  } catch (error) {
    res.status(500).json({ message:'Login Failed'});
  }
});

export default router;
