const express = require('express');
const router = express.Router();
const shopCtrl = require('../controllers/shopsController');

router.get('/', shopCtrl.getAllShops);

router.post('/',shopCtrl.createShop);

router.get('/:id', shopCtrl.getSingleShop);

router.patch('/:id', shopCtrl.updateShop );

router.delete('/:id', shopCtrl.deleteShop );


module.exports = router