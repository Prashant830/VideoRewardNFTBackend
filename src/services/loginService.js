const loginModel = require('../models/loginModel');
const AppError = require('../utils/AppError');

async function getLoginToken(body) {
    try {
        const token = await loginModel.getLoginToken(body);
        if (!token) throw new AppError('Token not found', 401);
        return token;
    } catch (error) {
        throw new AppError(error.message, 401);
    }
}

async function saveUser(body) {
    try {
        await loginModel.saveUser(body);
    } catch (error) {
        throw new AppError(error.message, 401);
    }
}

module.exports = { getLoginToken , saveUser};
