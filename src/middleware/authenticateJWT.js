const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError'); // Adjust the path to where AppError is located
const JWT_SECRET = require('../config/config').JWT_SECRET;

async function authenticateJWT(req, res, next) {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return next(new AppError('Access denied. No token provided.', 401));
        }

        const decoded = await jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError('Invalid token.', 400));
    }
}

module.exports = authenticateJWT;
