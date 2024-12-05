const jwt = require('jsonwebtoken');
const { sendHttpResponse } = require('../helpers/helpers');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        sendHttpResponse(res, 401, 'error', [], 'Access token is missing');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.authUserId = decodedToken.userId; // Attach the decoded user data to the request
        next();
    } catch (error) {
        sendHttpResponse(res, 403, 'error', [], 'Invalid token');
    }
};

module.exports = authenticateToken;
