const AppError = require('../utils/AppError');
const loginService = require('../services/loginService');

async function userLogin(req, res, next) {
    try {
        console.log(req.body); 
        const loginToken = await loginService.getLoginToken(req.body);
        res.status(200).json({
            status: 'success',
            token: loginToken,
        });
    } catch (error) {
        next(error);
    }
}

async function userRegister(req, res, next) {
    try {
        console.log(req.body + "In registration"); 
        await loginService.saveUser(req.body);
        res.status(200).json({
            status: 'success',
            message: 'User Save Successfully.',
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { userLogin ,  userRegister};
