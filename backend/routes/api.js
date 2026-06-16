const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Public route for form submission
router.post('/contact', contactController.submitContactForm);

// Public route for admin login & signup
router.post('/admin/login', adminController.adminLogin);
router.post('/admin/signup', adminController.adminSignup);

// Protected routes for admin portal
router.get('/admin/messages', auth, adminController.getMessages);
router.delete('/admin/messages/:id', auth, adminController.deleteMessage);

module.exports = router;
