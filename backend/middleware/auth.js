const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No authorization header, access denied' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ success: false, message: 'Token format invalid' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforauthtokens');
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }
};
