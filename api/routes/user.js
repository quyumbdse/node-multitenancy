
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');


router.post('/', userCtrl.userSignup);

module.exports = router