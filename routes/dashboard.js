import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/protected.js';
import User from '../models/user.js';

router.get('/', async (req, res) => {
    // This route is protected and only accessible with a valid token.
    // You can access the user data from req.userData.
    try {
        const data = await User.find();
        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    // This route is protected and only accessible with a valid token.
    // You can access the user data from req.userData.
    try {
        const { id } = req.params;
        const found = await User.findById(id);
        res.status(200).json({ data: found });
    } catch (error) {
        res.status(500).json({ error: 'Could not found' });
    }
    res.status(200).json({ message: 'Access granted' });
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const userId = req?.userData?.userId
        const { username, phone, address, bottles } = req.body;
        const created = new User({
            userId,
            username,
            phone,
            address,
            bottles
        });
        await created.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Updation failed' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Deletion failed' });
    }
});

export default router;
