const Contact = require('../models/Contact');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.adminSignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: username.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Admin user with this email already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const newUser = new User({
            email: username,
            password: hashedPassword
        });
        
        await newUser.save();
        
        res.status(201).json({
            success: true,
            message: 'Admin account created successfully. You can now log in.'
        });
    } catch (err) {
        console.error('Admin Signup Error: ', err);
        res.status(500).json({ success: false, message: 'Server error during signup' });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }
        
        let isValid = false;
        
        // 1. Try DB Authentication
        const dbUser = await User.findOne({ email: username.toLowerCase() });
        if (dbUser) {
            isValid = await bcrypt.compare(password, dbUser.password);
        }
        
        // 2. Fallback to Env Authentication (if not valid or user doesn't exist in DB)
        if (!isValid) {
            const envUser = process.env.ADMIN_USERNAME || 'admin';
            const envPass = process.env.ADMIN_PASSWORD || 'adminpassword123';
            if (username === envUser && password === envPass) {
                isValid = true;
            }
        }
        
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
        }
        
        // Generate Token
        const token = jwt.sign(
            { role: 'admin', username },
            process.env.JWT_SECRET || 'supersecretjwtkeyforauthtokens',
            { expiresIn: '24h' }
        );
        
        res.status(200).json({
            success: true,
            message: 'Authenticated successfully',
            token
        });
    } catch (err) {
        console.error('Admin Login Error: ', err);
        res.status(500).json({ success: false, message: 'Server error during authentication' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        // Query params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        
        // Building search criteria
        let query = {};
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query = {
                $or: [
                    { name: searchRegex },
                    { email: searchRegex },
                    { subject: searchRegex },
                    { message: searchRegex },
                    { phone: searchRegex }
                ]
            };
        }
        
        const skip = (page - 1) * limit;
        
        // Fetch matching items
        const messages = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Contact.countDocuments(query);
        
        res.status(200).json({
            success: true,
            data: messages,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        });
    } catch (err) {
        console.error('Fetch Messages Error: ', err);
        res.status(500).json({ success: false, message: 'Server error, failed to retrieve messages.' });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const message = await Contact.findById(id);
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message record not found' });
        }
        
        await Contact.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Message deleted successfully.'
        });
    } catch (err) {
        console.error('Delete Message Error: ', err);
        res.status(500).json({ success: false, message: 'Server error, failed to delete message.' });
    }
};
