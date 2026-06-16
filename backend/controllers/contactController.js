const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // Simple Validation
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All form fields are required.' });
        }
        
        // Save to Database
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            ipAddress
        });
        
        await newContact.save();
        
        // Send email notification using Nodemailer
        // Set up transporter (SMTP or dev service)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL || 'haribhushan7852@gmail.com',
            subject: `New Portfolio Message: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #4f46e5; margin-bottom: 20px;">New Contact Submission</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
                            <td style="padding: 10px 0; color: #0f172a;">${name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email:</td>
                            <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone:</td>
                            <td style="padding: 10px 0; color: #0f172a;">${phone}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 10px 0; font-weight: bold; color: #475569;">Subject:</td>
                            <td style="padding: 10px 0; color: #0f172a;">${subject}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 10px 0; font-weight: bold; color: #475569;">IP Address:</td>
                            <td style="padding: 10px 0; color: #64748b; font-family: monospace;">${ipAddress}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #4f46e5;">
                        <h4 style="margin: 0 0 10px 0; color: #334155;">Message:</h4>
                        <p style="margin: 0; color: #334155; white-space: pre-wrap; line-height: 1.5;">${message}</p>
                    </div>
                    <div style="margin-top: 20px; font-size: 0.8rem; color: #94a3b8; text-align: center;">
                        Submitted on: ${new Date().toLocaleString()}
                    </div>
                </div>
            `
        };
        
        // Attempt to send email asynchronously (non-blocking server response)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Nodemailer Error: ', error);
                // We won't crash the client response if email fails, database record is safely written!
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        
        res.status(201).json({
            success: true,
            message: 'Your message has been submitted successfully and the admin has been notified.'
        });
        
    } catch (err) {
        console.error('Submit Form Error: ', err);
        res.status(500).json({ success: false, message: 'Server error, failed to submit form.' });
    }
};
