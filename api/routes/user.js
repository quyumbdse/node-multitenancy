
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');


router.post('/', userCtrl.userSignup);
router.post('/', userCtrl.loginController);

module.exports = router