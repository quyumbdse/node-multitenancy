const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/ordersController');

router.get('/', orderCtrl.getAllOrders );

router.post('/',);

router.get('/:id', );

router.patch('/:id',  );

router.delete('/:id', );

module.exports = router