const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login',  loginController.userLogin);
router.post('/register',  loginController.userRegister);

module.exports = router;
