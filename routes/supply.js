import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/protected.js';
import Supply from '../models/supply.js';

router.get('/', verifyToken, async (req, res) => {
    // This route is protected and only accessible with a valid token.
    // You can access the user data from req.userData.
    try {
        const data = await Supply.find();
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
        const found = await Supply.findById(id);
        res.status(200).json({ data: found });
    } catch (error) {
        res.status(500).json({ error: 'Could not found' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const userId = req?.userData?.userId
        const { username, phone, address, bottles } = req.body;
        const created = new Supply({
            userId,
            username,
            phone,
            address,
            bottles
        });
        await created.save();
        const users = await Supply.find();
        res.status(201).json({ message: 'Registered Successfully',data:users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration Failed' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        let updated = await Supply.findByIdAndUpdate(id, req.body, { new: true });
        const users = await Supply.find();
        res.status(200).json({ message: 'Updated Successfully', data:users});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Updation Failed' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        let deleted = await Supply.findByIdAndDelete(id);
        const users = await Supply.find();
        res.status(200).json({ message: 'Deleted Successfully',data:users});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Deletion Failed' });
    }
});

export default router;
