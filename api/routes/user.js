
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');


router.post('/signup', userCtrl.userSignup);
router.post('/login',  userCtrl.loginController);

module.exports = router