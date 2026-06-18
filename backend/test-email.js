const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const receiverEmail = process.env.RECEIVER_EMAIL || 'haribhushan7852@gmail.com';

console.log('=== EMAIL CONFIG TEST ===');
console.log('EMAIL_USER:', emailUser);
console.log('EMAIL_PASS:', emailPass ? '**** (Set)' : '(Not Set)');
console.log('RECEIVER_EMAIL:', receiverEmail);

if (!emailUser || emailUser === 'your_email@gmail.com') {
    console.error('\n❌ ERROR: EMAIL_USER has not been configured in your backend/.env file.');
    console.log('Please open backend/.env and set EMAIL_USER to your Gmail address.');
    process.exit(1);
}
if (!emailPass || emailPass === 'your_gmail_app_password') {
    console.error('\n❌ ERROR: EMAIL_PASS has not been configured in your backend/.env file.');
    console.log('Please open backend/.env and set EMAIL_PASS to your 16-character Google App Password.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

const mailOptions = {
    from: `"Portfolio Test" <${emailUser}>`,
    to: receiverEmail,
    subject: 'SMTP Verification Check - Portfolio Web App',
    text: 'Hello! This is a test email sent from your Portfolio Backend server to verify that your Nodemailer SMTP credentials are configured and working correctly. If you receive this, it works!',
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px;">
            <h2 style="color: #4f46e5;">SMTP Verification Success! 🎉</h2>
            <p>Your portfolio mail settings are configured correctly.</p>
            <p>Messages sent through the contact form will now be delivered directly to your inbox at <strong>${receiverEmail}</strong>.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 0.8rem; color: #777;">Sent on: ${new Date().toLocaleString()}</p>
        </div>
    `
};

console.log('\nSending verification email...');

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('\n❌ SMTP Verification FAILED!');
        console.error(error);
        process.exit(1);
    } else {
        console.log('\n✅ SMTP Verification SUCCESSFUL!');
        console.log('Response:', info.response);
        console.log('Message ID:', info.messageId);
        console.log(`\nPlease check your email inbox at: ${receiverEmail}`);
        process.exit(0);
    }
});
