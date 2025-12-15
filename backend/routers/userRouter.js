const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware,signToken } = require('../middleware/authMiddleware');

router.post('/signup',async (req, res) => {
    const user = req.body;
    try {
        const newUser =  new User(user);
        const response = await newUser.save();
        console.log('User registered successfully');

        const payload = { id: response._id};
        const token = signToken(payload);
        console.log(token);

        res.status(201).send({ message: 'User registered successfully', response: response,token:token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user', error: error });
    }
});

router.post('/login', async (req, res) => {
    const { aadharcard, password } = req.body;
    try {
        const user = await User.findOne({ aadharcard: aadharcard});

        const payload = { id: user._id};
        const token = signToken(payload);
        console.log(token);

        if (!user) {
            return  res.status(400).send({ message: 'Invalid aadharcard or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid aadharcard or password' });
        }
        res.status(200).send({ message: 'Login successful', res : user, token: token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send({ message: 'Error logging in user', error: error });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User profile fetched successfully', user: user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send({ message: 'Error fetching user profile', error: error });
    }
});

router.put('/profile/password', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (!await user.comparePassword(oldPassword)) {
            return res.status(400).send({ message: 'Old password is incorrect' });
        }
        user.password = newPassword;
        const response = await user.save();
        console.log('Password updated successfully');
        res.status(200).send({ message: 'Password updated successfully',res : response });

    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send({ message: 'Error updating user profile', err: error });
    }
});

module.exports = router;